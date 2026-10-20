#!/usr/bin/env python3
"""Final hidden-mark hygiene pass. Run on every piece of text before delivery.

Removes the *character-level* ways text can carry hidden marks or junk, then
re-scans to verify nothing is left. Stdlib only. Idempotent.

Mark classes handled:
  1. Invisible carriers: zero-width chars, BOM, soft hyphen, word joiner,
     invisible math operators, Unicode tag characters (ASCII smuggling),
     variation-selector chains (Butler 2025 byte smuggling), bidi overrides
     and embeddings (Trojan Source), private-use code points, noncharacters,
     Hangul/Braille/Khmer "blank" fillers, C0/C1 controls, object replacement.
     Load-bearing invisibles are kept: emoji ZWJ sequences and VS16, flag tag
     sequences, joiners inside Arabic/Indic/Persian words, RTL marks.
     (Core carrier logic is text_unicode.py, vendored from
     guillaumemeyer/watermarks-remover, MIT.)
  2. Whitespace substitution: exotic spaces (U+2000-200A, U+202F, U+205F,
     U+00A0, U+3000, U+1680) that encode bits the way EasyMark/WhiteMark,
     Innamark, and UniSpach do; trailing spaces/tabs (SNOW-style); runs of
     multiple spaces; stray tabs inside prose lines; U+2028/U+2029; long blank-
     line runs. No-break spaces in genuine French punctuation are kept.
  3. Homoglyphs: Cyrillic/Greek/Armenian look-alikes inside Latin words
     (mixed-script words, per the UTS #39 idea), all-look-alike "Latin" words
     in Latin text, fullwidth Latin, mathematical-alphanumeric "styled" text,
     Roman-numeral and letterlike symbols used as letters. Real Cyrillic or
     Greek words are left alone.
  4. Typographic pattern channels: mixed straight/curly apostrophes and quotes
     (the Genius "REDHANDED" Morse technique), mixed hyphen code points,
     mixed ellipsis forms; Unicode normalization-form channel (text is set to
     NFC so NFC/NFD choice cannot encode bits).
  5. Paste debris: chat citation markup (oaicite, turnNsearchN, [cite: N],
     span markers, grok_card, DeepSeek brackets, Perplexity tags, :::writing),
     AI-tool URL tracking parameters, provenance HTML comments.

Not handled, by design: statistical (token-choice) watermarks such as the one
Anthropic applies to Claude text or Google's SynthID. They live in word choice,
cannot be verified without the vendor key, and this skill does not target them.

Code blocks and inline code are never modified; hidden characters found there
are reported so a human can decide.

Usage
  python3 finalize.py IN [-o OUT] [--check] [--json] [--quotes auto|straight|curly]
                       [--keep-styled] [--keep-hard-breaks] [--all-utm]
  cat draft.md | python3 finalize.py - > final.md

Exit: 0 = clean after pass (or already clean with --check), 1 = residue remains
(or marks found with --check), 2 = bad input.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
import unicodedata
from collections import Counter
from pathlib import Path
from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

sys.path.insert(0, str(Path(__file__).resolve().parent))
from text_unicode import clean_text as vendored_clean  # noqa: E402

# ---------------------------------------------------------------------------
# Tables
# ---------------------------------------------------------------------------

EXTRA_STRIP = {
    0x2800: "braille pattern blank",
    0xFFFC: "object replacement character",
    0x1D159: "musical symbol null notehead",
    0x1D173: "musical invisible begin beam",  # outside music context
    0x2061: "function application",
    0x2062: "invisible times",
    0x2063: "invisible separator",
    0x2064: "invisible plus",
    0x115F: "hangul choseong filler",
    0x1160: "hangul jungseong filler",
    0x3164: "hangul filler",
    0xFFA0: "halfwidth hangul filler",
    0x180E: "mongolian vowel separator",
}
EXOTIC_SPACES = {
    0x00A0,
    0x1680,
    0x2000,
    0x2001,
    0x2002,
    0x2003,
    0x2004,
    0x2005,
    0x2006,
    0x2007,
    0x2008,
    0x2009,
    0x200A,
    0x202F,
    0x205F,
    0x3000,
}
LINE_SEPS = {0x2028: "\n", 0x2029: "\n\n"}

# Look-alikes of Latin letters from other scripts (subset of Unicode confusables.txt)
CONFUSABLE = {
    # Cyrillic lowercase
    "\u0430": "a",
    "\u0435": "e",
    "\u043e": "o",
    "\u0440": "p",
    "\u0441": "c",
    "\u0443": "y",
    "\u0445": "x",
    "\u0456": "i",
    "\u0458": "j",
    "\u0455": "s",
    "\u0501": "d",
    "\u051b": "q",
    "\u051d": "w",
    "\u04bb": "h",
    "\u0475": "v",
    "\u04cf": "l",
    "\u0432": "b",  # в only in mixed words
    "\u043a": "k",
    "\u043c": "m",
    "\u043d": "h",
    "\u0442": "t",
    "\u0433": "r",
    # Cyrillic uppercase
    "\u0410": "A",
    "\u0412": "B",
    "\u0415": "E",
    "\u041a": "K",
    "\u041c": "M",
    "\u041d": "H",
    "\u041e": "O",
    "\u0420": "P",
    "\u0421": "C",
    "\u0422": "T",
    "\u0425": "X",
    "\u0406": "I",
    "\u0408": "J",
    "\u0405": "S",
    "\u04ae": "Y",
    "\u0417": "3",
    "\u0417": "3",
    # Greek
    "\u03bf": "o",
    "\u03b1": "a",
    "\u03bd": "v",
    "\u03c1": "p",
    "\u03c4": "t",
    "\u03c5": "u",
    "\u03b9": "i",
    "\u03ba": "k",
    "\u03c7": "x",
    "\u0391": "A",
    "\u0392": "B",
    "\u0395": "E",
    "\u0396": "Z",
    "\u0397": "H",
    "\u0399": "I",
    "\u039a": "K",
    "\u039c": "M",
    "\u039d": "N",
    "\u039f": "O",
    "\u03a1": "P",
    "\u03a4": "T",
    "\u03a5": "Y",
    "\u03a7": "X",
    # Armenian and others
    "\u0585": "o",
    "\u057d": "u",
    "\u0578": "n",
    "\u0570": "h",
    "\u0261": "g",
    "\u0131": "i",
    "\u01c0": "l",
    "\u0269": "i",
}
# Only these are safe to map when the *whole* word is look-alikes (strong Latin shapes)
STRONG_CONFUSABLE = set(
    "\u0430\u0435\u043e\u0440\u0441\u0443\u0445\u0456\u0458\u0455\u0501\u051b\u051d\u04bb"
    "\u0410\u0412\u0415\u041a\u041c\u041d\u041e\u0420\u0421\u0422\u0425\u0406\u0408\u0405"
    "\u03bf\u039f\u0391\u0392\u0395\u0397\u0399\u039a\u039c\u039d\u03a1\u03a4\u03a7\u0585"
)

STYLED_RANGES = [
    (0xFF01, 0xFF5E),
    (0x1D400, 0x1D7FF),
    (0x2100, 0x214F),
    (0x2160, 0x2188),
    (0x24B6, 0x24E9),
    (0x1F130, 0x1F189),
]

HYPHEN_VARIANTS = {
    "\u2010": "-",
    "\u2011": "-",
    "\u2012": "-",
    "\u2043": "-",
    "\ufe63": "-",
    "\uff0d": "-",
}

LEAK_PATTERNS = [
    (
        r"[\ue000-\uf8ff]*cite[\ue000-\uf8ff]*turn\d+(?:search|news|file|image)\d+[\ue000-\uf8ff]*",
        "ChatGPT citeturn marker",
    ),
    (
        r"[\ue000-\uf8ff]*\bi?turn\d+(?:search|news|file|image)\d+(?:turn\d+(?:search|news|file|image)\d+)*[\ue000-\uf8ff]*",
        "ChatGPT turn marker",
    ),
    (r"\s?:?contentReference\[oaicite:\d+\]\{index=\d+\}", "ChatGPT contentReference"),
    (r"\s?\[?oai_citation[^\]\s]*\]?", "ChatGPT oai_citation"),
    (
        r"\s?\(\{\"attribution\":\{\"attributableIndex\":\"[\d-]+\"\}\}\)",
        "ChatGPT attributableIndex",
    ),
    (r"\s?\[cite:\s*\d+(?:\s*,\s*\d+)*\]", "Gemini [cite]"),
    (r"\[span_\d+\]\((?:start|end)_span\)", "Gemini span marker"),
    (
        r"<grok[_:-]card[^>]*>.*?</grok[_:-]card>|<grok[_:-]card[^>]*/?>|grok_render_citation_card_json\S*",
        "Grok card",
    ),
    (r"\u3010\d+\u2020[^\u3011]*\u3011", "DeepSeek citation"),
    (r"\s?\[(?:attached_file|web):\d+\]", "Perplexity citation"),
    (r":::writing\{[^}\n]*\}\n?", ":::writing wrapper"),
]
AI_UTM = re.compile(
    r"^(?:chatgpt\.com|chat\.openai\.com|openai|copilot\.com|claude\.ai|perplexity(?:\.ai)?|gemini(?:\.google\.com)?|grok\.com|bard)$",
    re.I,
)
PROVENANCE_COMMENT = re.compile(
    r"<!--(?:(?!-->).){0,400}?\b(?:generated|written|drafted|created) (?:by|with|using)\b(?:(?!-->).){0,200}?-->|<!--(?:(?!-->).){0,400}?\b(?:ChatGPT|GPT-\d|Claude|Gemini|Copilot|Grok|LLM|AI model|language model)\b(?:(?!-->).){0,400}?-->",
    re.S | re.I,
)

FRENCH_NBSP_CTX = re.compile(
    r"[\u00a0\u202f](?=[;:!?\u00bb%\u20ac])|(?<=\u00ab)[\u00a0\u202f]"
)

CODE_RE = re.compile(r"(```.*?```|~~~.*?~~~|`[^`\n]+`)", re.S)
URL_RE = re.compile(r"https?://[^\s)\]>\"']+")

# ---------------------------------------------------------------------------


def is_latin_letter(ch: str) -> bool:
    return (
        ch.isascii()
        and ch.isalpha()
        or ("LATIN" in unicodedata.name(ch, "") and ch.isalpha())
    )


def script_of(ch: str) -> str:
    n = unicodedata.name(ch, "")
    for s in ("LATIN", "CYRILLIC", "GREEK", "ARMENIAN"):
        if n.startswith(s):
            return s
    return "OTHER"


LIST_ITEM_RE = re.compile(r"^ {0,3}(?:[-*+]|\d+[.)])[ \t]")
FENCE_LINE_RE = re.compile(r"^ {0,3}(```|~~~)")


def indented_code_spans(text: str) -> list[tuple[int, int]]:
    """Markdown indented code blocks: 4+ spaces or a tab, after a blank line,
    not continuing a list item or a fenced block."""
    spans, pos, fence = [], 0, None
    start = end = None
    prev_blank, last_text = True, ""
    for ln in text.splitlines(keepends=True):
        body = ln.rstrip("\r\n")
        blank = not body.strip()
        indented = not blank and (body.startswith("    ") or body.startswith("\t"))
        f = FENCE_LINE_RE.match(body)
        if start is not None:
            if indented:
                end = pos + len(body)
            elif not blank:
                spans.append((start, end))
                start = None
        if start is None:
            if fence:
                if f and f.group(1) == fence:
                    fence = None
            elif f:
                fence = f.group(1)
            elif (
                indented
                and prev_blank
                and not LIST_ITEM_RE.match(last_text)
                and not last_text.startswith((" ", "\t"))
            ):
                start, end = pos, pos + len(body)
            if not blank and start is None:
                last_text = body
        prev_blank = blank
        pos += len(ln)
    if start is not None:
        spans.append((start, end))
    return spans


def split_code(text: str) -> list[tuple[bool, str]]:
    parts, pos = [], 0

    def prose(seg: str) -> None:
        p = 0
        for m in CODE_RE.finditer(seg):
            if m.start() > p:
                parts.append((False, seg[p : m.start()]))
            parts.append((True, m.group(0)))
            p = m.end()
        if p < len(seg):
            parts.append((False, seg[p:]))

    for a, b in indented_code_spans(text):
        prose(text[pos:a])
        parts.append((True, text[a:b]))
        pos = b
    prose(text[pos:])
    return parts


def fix_homoglyphs(prose: str, latin_doc: bool, report: Counter) -> str:
    def word_fix(m: re.Match) -> str:
        w = m.group(0)
        scripts = {script_of(c) for c in w if c.isalpha()}
        has_latin = "LATIN" in scripts
        if has_latin and scripts & {"CYRILLIC", "GREEK", "ARMENIAN"}:
            out = "".join(CONFUSABLE.get(c, c) for c in w)
            if out != w:
                report["homoglyph (mixed-script word)"] += 1
            return out
        if (
            latin_doc
            and not has_latin
            and len(w) >= 2
            and all(c in STRONG_CONFUSABLE for c in w if c.isalpha())
        ):
            report[f"review: look-alike word, left unchanged: {w}"] += 1
        return w

    return re.sub(r"[^\W\d_]+", word_fix, prose)


def fold_styled(prose: str, report: Counter) -> str:
    out = []
    for i, ch in enumerate(prose):
        cp = ord(ch)
        if (
            any(a <= cp <= b for a, b in STYLED_RANGES)
            and ch not in "\u2116\u2122\u2103\u2109"
            and ch.isalnum()
            and prose[i + 1 : i + 2] != "\ufe0f"
        ):
            folded = unicodedata.normalize("NFKC", ch)
            if folded != ch and folded.isascii():
                report["styled/fullwidth letter folded"] += 1
                out.append(folded)
                continue
        out.append(ch)
    return "".join(out)


def unify_quotes(prose_parts: list[str], mode: str, report: Counter) -> list[str]:
    joined = "".join(prose_parts)
    s_apos = len(re.findall(r"(?<=\w)'(?=\w)", joined))
    c_apos = len(re.findall(r"(?<=\w)\u2019(?=\w)", joined))
    s_dq = joined.count('"')
    c_dq = joined.count("\u201c") + joined.count("\u201d")
    s_sq = len(re.findall(r"(?<!\w)'|'(?!\w)", joined))
    c_sq = joined.count("\u2018") + len(re.findall(r"(?<!\w)\u2019|\u2019(?!\w)", joined))
    if mode == "auto":
        straight = (s_apos + s_dq + s_sq) >= (c_apos + c_dq + c_sq)
    else:
        straight = mode == "straight"
    mixed = (s_apos and c_apos) or (s_dq and c_dq) or (s_sq and c_sq)
    if not mixed and mode == "auto":
        return prose_parts
    out = []
    for p in prose_parts:
        before = p
        if straight:
            p = p.translate(
                {
                    0x2018: "'",
                    0x2019: "'",
                    0x201C: '"',
                    0x201D: '"',
                    0x201B: "'",
                    0x201F: '"',
                    0x2032: "'",
                    0x2033: '"',
                }
            )
        else:
            p = re.sub(r"(?<=\w)'(?=\w)", "\u2019", p)
            p = re.sub(r"(^|[\s(\[{\u2014-])\"", "\\1\u201c", p)
            p = p.replace('"', "\u201d")
            p = re.sub(r"(^|[\s(\[{\u2014-])'", "\\1\u2018", p)
            p = p.replace("'", "\u2019")
        if p != before:
            report[
                "quote/apostrophe style unified ("
                + ("straight" if straight else "curly")
                + ")"
            ] += sum(1 for a, b in zip(before, p) if a != b)
        out.append(p)
    return out


def unify_ellipsis(prose_parts: list[str], report: Counter) -> list[str]:
    joined = "".join(prose_parts)
    uni, ascii3 = joined.count("\u2026"), len(
        re.findall(r"(?<!\.)\.\.\.(?!\.)", joined)
    )
    if uni and ascii3:
        target_ascii = ascii3 >= uni
        report["ellipsis style unified"] += min(uni, ascii3)
        return [
            (
                p.replace("\u2026", "...")
                if target_ascii
                else re.sub(r"(?<!\.)\.\.\.(?!\.)", "\u2026", p)
            )
            for p in prose_parts
        ]
    return prose_parts


def clean_urls(prose: str, all_utm: bool, report: Counter) -> str:
    def fix(m: re.Match) -> str:
        url = m.group(0)
        trail = ""
        while url and url[-1] in ".,;:!?":
            trail, url = url[-1] + trail, url[:-1]
        try:
            parts = urlsplit(url)
        except ValueError:
            return m.group(0)
        if not parts.query:
            return m.group(0)
        q = parse_qsl(parts.query, keep_blank_values=True)
        ai = any(
            k.lower() in ("utm_source", "referrer", "ref") and AI_UTM.match(v or "")
            for k, v in q
        )
        if not ai and not all_utm:
            return m.group(0)
        keep = [
            (k, v)
            for k, v in q
            if not (
                k.lower().startswith("utm_")
                or (k.lower() in ("referrer", "ref") and AI_UTM.match(v or ""))
            )
        ]
        report["AI tracking parameter removed from URL"] += 1
        return (
            urlunsplit(
                (
                    parts.scheme,
                    parts.netloc,
                    parts.path,
                    urlencode(keep),
                    parts.fragment,
                )
            )
            + trail
        )

    return URL_RE.sub(fix, prose)


def whitespace(prose: str, keep_hard_breaks: bool, report: Counter) -> str:
    # line separators
    for cp, rep in LINE_SEPS.items():
        n = prose.count(chr(cp))
        if n:
            report["unicode line/paragraph separator"] += n
            prose = prose.replace(chr(cp), rep)
    # exotic spaces (keep genuine French punctuation no-break spaces)
    keep_spans = {m.start() for m in FRENCH_NBSP_CTX.finditer(prose)}
    chars = []
    for i, ch in enumerate(prose):
        if ord(ch) in EXOTIC_SPACES and i not in keep_spans:
            report[f"exotic space U+{ord(ch):04X} -> space"] += 1
            chars.append(" ")
        else:
            chars.append(ch)
    prose = "".join(chars)
    lines = prose.split("\n")
    out = []
    for ln in lines:
        is_table = ln.lstrip().startswith("|")
        stripped = ln.rstrip(" \t")
        trail = ln[len(stripped) :]
        body = stripped.lstrip(" \t")
        lead = stripped[: len(stripped) - len(body)]
        if trail:
            if keep_hard_breaks and trail == "  " and body:
                pass
            else:
                report["trailing whitespace removed"] += 1
                trail = ""
        if not is_table:
            nb = re.sub(r"(?<=\S)[ \t]{2,}(?=\S)", " ", body)
            if nb != body:
                report["internal multi-space/tab run collapsed"] += 1
            body = nb.replace("\t", " ") if "\t" in nb else nb
        out.append(lead + body + trail)
    prose = "\n".join(out)
    nb = re.sub(r"\n{4,}", "\n\n\n", prose)
    if nb != prose:
        report["long blank-line run collapsed"] += 1
    return nb


def alm_outside_arabic(s: str, i: int) -> bool:
    """True when the U+061C at s[i] has no Arabic-script letter on either side."""
    def near(step: int) -> str:
        j = i + step
        while 0 <= j < len(s) and s[j].isspace():
            j += step
        return s[j] if 0 <= j < len(s) else ""
    return not any(
        c and unicodedata.name(c, "").startswith("ARABIC") for c in (near(-1), near(1))
    )


def extra_invisibles(prose: str, report: Counter) -> str:
    out = []
    for i, ch in enumerate(prose):
        cp = ord(ch)
        if cp in EXTRA_STRIP:
            report[f"invisible {EXTRA_STRIP[cp]}"] += 1
            continue
        if cp == 0x061C and alm_outside_arabic(prose, i):
            report["invisible arabic letter mark (outside Arabic)"] += 1
            continue
        cat = unicodedata.category(ch)
        if cat == "Cc" and ch not in "\n\t\r":
            report["control character"] += 1
            continue
        out.append(ch)
    s = "".join(out)
    # combining-mark pileups (Zalgo / mark stacking): keep at most 3 per base
    s2 = re.sub(
        r"([^\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f])([\u0300-\u036f\u1ab0-\u1aff\u1dc0-\u1dff\u20d0-\u20ff\ufe20-\ufe2f]{4,})",
        lambda m: m.group(1) + m.group(2)[:3],
        s,
    )
    if s2 != s:
        report["stacked combining marks trimmed"] += 1
    return s2


WRITING_WRAPPER = re.compile(
    r"^:::writing\{[^}\n]*\}[ \t]*\n(.*?)^:::[ \t]*$\n?", re.M | re.S
)


def process_prose(p: str, args, latin_doc: bool, report: Counter) -> str:
    p, n = WRITING_WRAPPER.subn(r"\1", p)
    if n:
        report["leak: :::writing wrapper"] += n
    for pat, label in LEAK_PATTERNS:
        p, n = re.subn(pat, "", p, flags=re.M | re.S)
        if n:
            report[f"leak: {label}"] += n
    p, n = PROVENANCE_COMMENT.subn("", p)
    if n:
        report["provenance HTML comment removed"] += n
    p = clean_urls(p, args.all_utm, report)
    cleaned, stats = vendored_clean(
        p, normalize_spaces=False
    )  # carriers; spaces handled below
    for label, c in stats["removed"].items():
        report[f"invisible carrier: {label}"] += c
    p = extra_invisibles(cleaned, report)
    p = whitespace(p, args.keep_hard_breaks, report)
    for k, v in HYPHEN_VARIANTS.items():
        n = p.count(k)
        if n:
            report[f"hyphen variant U+{ord(k):04X}"] += n
            p = p.replace(k, v)
    p = re.sub(r"(?<=[A-Za-z])\u2212(?=[A-Za-z])", "-", p)
    if not args.keep_styled:
        p = fold_styled(p, report)
    p = fix_homoglyphs(p, latin_doc, report)
    return p


FLAG_TAG_SEQ = re.compile("\U0001F3F4[\U000E0020-\U000E007E]+\U000E007F")


def scan_residue(text: str, args) -> Counter:
    """Re-scan cleaned prose for anything that should no longer be there."""
    res = Counter()
    for is_code, seg in split_code(text):
        if is_code:
            continue
        chars = FLAG_TAG_SEQ.sub("", seg)
        for i, ch in enumerate(chars):
            cp = ord(ch)
            cat = unicodedata.category(ch)
            if cp == 0x061C:
                if alm_outside_arabic(chars, i):
                    res["invisible/private/noncharacter"] += 1
            elif 0xE0000 <= cp <= 0xE007F:
                res["tag character"] += 1
            elif cp in EXOTIC_SPACES:
                pass
            elif (
                cp in EXTRA_STRIP
                or (cat == "Cc" and ch not in "\n\t\r")
                or (0xE000 <= cp <= 0xF8FF)
                or (0xFDD0 <= cp <= 0xFDEF)
                or (cp & 0xFFFE) == 0xFFFE
            ):
                res["invisible/private/noncharacter"] += 1
        for m in re.finditer(r"[\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]", seg):
            if not FRENCH_NBSP_CTX.match(seg, m.start()) and not (
                m.start() > 0 and seg[m.start() - 1] == "\u00ab"
            ):
                res["exotic space"] += 1
        res["zero-width outside emoji/joining context"] += len(
            re.findall(
                r"(?<=[A-Za-z0-9 ])[\u200b\u200c\u200d\u2060\ufeff](?=[A-Za-z0-9 ])",
                seg,
            )
        )
        res["bidi override/embedding"] += len(re.findall(r"[\u202a-\u202e]", seg))
        res["variation-selector chain"] += len(
            re.findall(r"[\ufe00-\ufe0f\U000e0100-\U000e01ef]{2,}", seg)
        )
        for ln in seg.split("\n"):
            stripped = ln.rstrip(" \t")
            trail = ln[len(stripped) :]
            if trail and not (args.keep_hard_breaks and trail == "  " and stripped.strip()):
                res["trailing whitespace"] += 1
        res["mixed-script word"] += sum(
            1
            for w in re.findall(r"[^\W\d_]+", seg)
            if "LATIN" in {script_of(c) for c in w}
            and ({script_of(c) for c in w} & {"CYRILLIC", "GREEK", "ARMENIAN"})
            and "".join(CONFUSABLE.get(c, c) for c in w) != w
        )
        for pat, label in LEAK_PATTERNS:
            if re.search(pat, seg, re.M | re.S):
                res[f"leak: {label}"] += 1
        if re.search(
            r"[?&](?:utm_source|referrer)=(?:chatgpt\.com|openai|copilot\.com|claude\.ai|perplexity|grok\.com)",
            seg,
            re.I,
        ):
            res["AI URL parameter"] += 1
        res["hyphen variant"] += sum(seg.count(k) for k in HYPHEN_VARIANTS)
    if unicodedata.normalize("NFC", text) != text:
        res["non-NFC sequence"] += 1
    return +res


def code_findings(text: str) -> Counter:
    c = Counter()
    for is_code, seg in split_code(text):
        if not is_code:
            continue
        for ch in seg:
            cp = ord(ch)
            if (
                unicodedata.category(ch) == "Cf"
                or 0xE0000 <= cp <= 0xE007F
                or cp in EXOTIC_SPACES
            ):
                c[f"U+{cp:04X} {unicodedata.name(ch, '?')}"] += 1
    return c


def finalize(text: str, args) -> tuple[str, Counter]:
    report: Counter = Counter()
    if text.startswith("\ufeff"):
        text = text[1:]
        report["leading BOM"] += 1
    crlf = text.count("\r\n") > 0 and text.count("\r\n") == text.count("\n")
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    letters = [c for c in text if c.isalpha()]
    latin_doc = (
        bool(letters)
        and sum(1 for c in letters if script_of(c) == "LATIN") / len(letters) > 0.8
    )
    parts = split_code(text)
    prose_idx = [i for i, (is_code, _) in enumerate(parts) if not is_code]
    new = [
        seg if is_code else process_prose(seg, args, latin_doc, report)
        for is_code, seg in parts
    ]
    # document-level pattern channels on prose only
    prose_parts = [new[i] for i in prose_idx]
    prose_parts = unify_quotes(prose_parts, args.quotes, report)
    prose_parts = unify_ellipsis(prose_parts, report)
    for i, p in zip(prose_idx, prose_parts):
        new[i] = p
    out = "".join(new)
    nfc = unicodedata.normalize("NFC", out)
    if nfc != out:
        report["normalized to NFC"] += sum(1 for a, b in zip(out, nfc) if a != b) or 1
        out = nfc
    if crlf:
        out = out.replace("\n", "\r\n")
    return out, report


def main() -> int:
    ap = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    ap.add_argument("path", nargs="?", default="-")
    ap.add_argument("-o", "--output", help="output file (default: stdout)")
    ap.add_argument("--check", action="store_true", help="report only; do not write")
    ap.add_argument(
        "--json", action="store_true", help="print the report as JSON to stderr"
    )
    ap.add_argument(
        "--quotes",
        default="auto",
        choices=["auto", "straight", "curly"],
        help="auto = unify only if mixed, to the majority style",
    )
    ap.add_argument(
        "--keep-styled",
        action="store_true",
        help="keep math-bold/fullwidth styled letters",
    )
    ap.add_argument(
        "--keep-hard-breaks",
        action="store_true",
        help="keep Markdown two-space line breaks",
    )
    ap.add_argument(
        "--all-utm",
        action="store_true",
        help="strip every utm_* parameter, not only AI-tool ones",
    )
    args = ap.parse_args()
    try:
        raw = (
            sys.stdin.buffer.read()
            if args.path == "-"
            else Path(args.path).read_bytes()
        )
    except OSError as e:
        print(f"cannot read: {e}", file=sys.stderr)
        return 2
    if b"\x00" in raw[:8192]:
        print("input looks binary; extract the text first", file=sys.stderr)
        return 2
    text = raw.decode("utf-8", errors="replace")

    out, report = finalize(text, args)
    again, report2 = finalize(out, args)
    idempotent = again == out
    residue = scan_residue(out, args)
    in_code = code_findings(out)

    summary = {
        "changed": out != text,
        "removed_or_normalized": {
            k: v for k, v in report.items() if not k.startswith("review: ")
        },
        "left_for_review": [
            k.removeprefix("review: ") for k in report if k.startswith("review: ")
        ],
        "residue_after_pass": dict(residue),
        "hidden_chars_inside_code_left_untouched": dict(in_code),
        "idempotent": idempotent,
        "not_handled": "statistical/token-choice watermarks (by design)",
    }
    if args.check:
        found = bool(summary["removed_or_normalized"]) or bool(residue)
        if args.json:
            print(json.dumps(summary, indent=2, ensure_ascii=False), file=sys.stderr)
        else:
            print_report(summary, check=True)
        return 1 if found else 0

    if args.output and args.output != "-":
        Path(args.output).write_text(out, encoding="utf-8", newline="")
    else:
        sys.stdout.write(out)
    if args.json:
        print(json.dumps(summary, indent=2, ensure_ascii=False), file=sys.stderr)
    else:
        print_report(summary, check=False)
    return 1 if residue or not idempotent else 0


def print_report(s: dict, check: bool) -> None:
    w = sys.stderr
    print(
        "=== finalize: hidden-mark hygiene"
        + (" (check only)" if check else "")
        + " ===",
        file=w,
    )
    if s["removed_or_normalized"]:
        print("found and " + ("would fix:" if check else "fixed:"), file=w)
        for k, v in sorted(s["removed_or_normalized"].items(), key=lambda x: -x[1]):
            print(f"  {v:>5}  {k}", file=w)
    else:
        print(
            "nothing to fix: no hidden characters, space tricks, homoglyphs, pattern channels, or paste debris",
            file=w,
        )
    if s["residue_after_pass"]:
        print("RESIDUE after pass (review):", file=w)
        for k, v in s["residue_after_pass"].items():
            print(f"  {v:>5}  {k}", file=w)
    else:
        print("verified: 0 character-level marks remain in prose", file=w)
    if s["left_for_review"]:
        print("left for review (may be real non-Latin words):", file=w)
        for k in s["left_for_review"]:
            print(f"         {k}", file=w)
    if s["hidden_chars_inside_code_left_untouched"]:
        print("inside code (left untouched, review manually):", file=w)
        for k, v in s["hidden_chars_inside_code_left_untouched"].items():
            print(f"  {v:>5}  {k}", file=w)
    if not s["idempotent"]:
        print("WARNING: a second pass changed the text again", file=w)
    print("not handled by design: statistical word-choice watermarks", file=w)


if __name__ == "__main__":
    sys.exit(main())
