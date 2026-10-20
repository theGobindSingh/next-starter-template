#!/usr/bin/env python3
"""Check that a rewrite kept the facts and protected spans of the original.

A humanizing rewrite fails in two quiet ways: it drops a fact (a number, a name,
a caveat) or it invents one to sound "specific". This script compares the
original and the rewrite and reports both directions. Stdlib only.

Usage
  python3 preserve_check.py ORIGINAL REWRITE [--json] [--fiction]

What it checks
  - fenced code blocks and inline code: must survive byte-for-byte
  - URLs, emails, file paths, @handles, #issue refs
  - numbers, percentages, money, dates, versions
  - quoted strings ("...") - verbatim quotes must not be reworded
  - capitalized names/terms (proper nouns not at sentence start)
  - negations and modal qualifiers (not/never/may/might/only) - counts only
  - required-disclosure lines (lines containing "disclos", "AI-generated",
    "sponsored", "affiliate", "conflict of interest", "not financial advice")

With --fiction, added names and numbers are reported as info, not errors,
because invented detail is the job in fiction.

Exit codes: 0 = nothing lost or invented, 1 = something to review, 2 = bad input.
This is mechanical. Passing it does not prove the meaning survived; read the
rewrite against the original as well.
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from collections import Counter
from pathlib import Path

FENCE = re.compile(r"```.*?```|~~~.*?~~~", re.S)
INLINE = re.compile(r"`[^`\n]+`")
URL = re.compile(r"https?://[^\s)>\]]+")
EMAIL = re.compile(r"\b[\w.+-]+@[\w-]+\.[\w.-]+\b")
PATH = re.compile(r"(?<![\w/])(?:~|\.{1,2})?/(?:[\w.-]+/)*[\w.-]+\.\w+\b")
HANDLE = re.compile(r"(?<![\w@])@[A-Za-z0-9_]{2,}|(?<![\w#])#\d+\b")
NUM = re.compile(
    r"(?<![\w.])(?:[$\u20ac\u00a3\u20b9\u00a5]\s?)?\d[\d,]*(?:\.\d+)?(?:\s?(?:%|percent|k|K|M|B|x|\u00d7|ms|s|GB|MB|TB|km|kg|lb|hrs?|min))?(?![\w])"
)
VERSION = re.compile(r"\bv?\d+\.\d+(?:\.\d+)*(?:-[\w.]+)?\b")
QUOTE = re.compile(r"[\"\u201c]([^\"\u201d\n]{3,200})[\"\u201d]")
PROPER = re.compile(r"(?<![.!?]\s)(?<!^)(?<!\n)\b([A-Z][a-z]+(?:[ -](?:of |the |de |van |von )?[A-Z][a-z]+)*|[A-Z]{2,}[a-z]*\d*)\b")
NEG = re.compile(r"\b(?:not|never|no|none|cannot|can't|won't|don't|doesn't|isn't|aren't|wasn't|weren't|without)\b", re.I)
MODAL = re.compile(r"\b(?:may|might|could|possibly|likely|unlikely|probably|approximately|about(?= [$\u20ac\u00a3\u20b9]?\d)|roughly|around(?= [$\u20ac\u00a3\u20b9]?\d)|only|at least|at most|up to|often|usually|sometimes|rarely)\b", re.I)
DISCLOSE = re.compile(r"(?i).*(?:disclos|ai-generated|generated (?:with|by) ai|sponsored|affiliate|conflict of interest|not (?:financial|legal|medical) advice|paid partnership).*")

COMMON_CAPS = set(
    "I A The This That These Those It He She They We You My Our Your His Her Their "
    "Monday Tuesday Wednesday Thursday Friday Saturday Sunday January February March April "
    "May June July August September October November December OK AI".split()
)


def norm_num(s: str) -> str:
    return re.sub(r"[\s,]", "", s.lower()).replace("percent", "%")


def strip_format(t: str) -> str:
    """Drop markdown headings and bold labels: they are formatting, not facts."""
    t = re.sub(r"(?m)^\s*#{1,6}\s.*$", " ", t)
    t = re.sub(r"(?m)^\s*(?:[-*+]|\d+[.)])\s+(?:\*\*[^*\n]+\*\*\s*[:.\u2014-]?\s*)?", "\n", t)
    t = re.sub(r"\*\*[^*\n]+\*\*", " ", t)
    return t


def extract(text: str) -> dict[str, Counter]:
    fences = FENCE.findall(text)
    body = FENCE.sub(" ", text)
    inline = INLINE.findall(body)
    body2 = INLINE.sub(" ", body)
    urls = URL.findall(body2)
    body3 = URL.sub(" ", body2)
    out = {
        "code_blocks": Counter(fences),
        "inline_code": Counter(inline),
        "urls": Counter(u.rstrip(".,;:") for u in urls),
        "emails": Counter(EMAIL.findall(body3)),
        "paths": Counter(PATH.findall(body3)),
        "handles": Counter(HANDLE.findall(body3)),
        "versions": Counter(VERSION.findall(body3)),
        "numbers": Counter(norm_num(n) for n in NUM.findall(VERSION.sub(" ", body3)) if re.search(r"\d", n)),
        "quotes": Counter(q.strip() for q in QUOTE.findall(body3)),
        "names": Counter(p for p in PROPER.findall(HANDLE.sub(" ", strip_format(body3))) if p not in COMMON_CAPS and len(p) > 1),
        "disclosures": Counter(line.strip() for line in body3.splitlines() if DISCLOSE.match(line)),
    }
    out["_neg"] = Counter({"count": len(NEG.findall(body3))})
    out["_modal"] = Counter({"count": len(MODAL.findall(strip_format(body3)))})
    return out


def diff(a: Counter, b: Counter) -> tuple[list, list]:
    missing = sorted((a - b).elements())
    added = sorted((b - a).elements())
    return missing, added


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("original")
    ap.add_argument("rewrite")
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--fiction", action="store_true", help="added names/numbers are info, not errors")
    a = ap.parse_args()
    try:
        o = Path(a.original).read_text(encoding="utf-8", errors="replace")
        r = Path(a.rewrite).read_text(encoding="utf-8", errors="replace")
    except OSError as e:
        print(f"cannot read: {e}", file=sys.stderr)
        return 2

    eo, er = extract(o), extract(r)
    # Names: a capitalized term seen mid-sentence in either text is a name;
    # count every occurrence of it (including sentence-initial) in both.
    vocab = set(eo["names"]) | set(er["names"])
    def count_names(t: str) -> Counter:
        body = HANDLE.sub(" ", strip_format(URL.sub(" ", INLINE.sub(" ", FENCE.sub(" ", t)))))
        c = Counter()
        for nm in vocab:
            n = len(re.findall(rf"(?<![\w-]){re.escape(nm)}(?![\w-])", body))
            if n:
                c[nm] = n
        return c
    eo["names"], er["names"] = count_names(o), count_names(r)
    results = {}
    problems = 0
    strict_missing = {"code_blocks", "inline_code", "urls", "emails", "paths", "quotes", "disclosures", "versions", "handles"}
    for key in [k for k in eo if not k.startswith("_")]:
        missing, added = diff(eo[key], er[key])
        results[key] = {"missing": missing, "added": added}
        if key in strict_missing and missing:
            problems += len(missing)
        if key in {"numbers", "names"}:
            if missing:
                problems += len(missing)
            if added and not a.fiction:
                problems += len(added)
        if key in {"code_blocks", "inline_code"} and added:
            problems += len(added)
    neg_o, neg_r = eo["_neg"]["count"], er["_neg"]["count"]
    mod_o, mod_r = eo["_modal"]["count"], er["_modal"]["count"]
    results["negations"] = {"original": neg_o, "rewrite": neg_r}
    results["qualifiers"] = {"original": mod_o, "rewrite": mod_r}
    qualifier_warning = neg_r < neg_o or mod_r < max(0, mod_o - 1)

    if a.json:
        print(json.dumps({"problems": problems, "qualifier_warning": qualifier_warning, "results": results}, indent=2, ensure_ascii=False))
    else:
        print("=== preservation check (mechanical; read for meaning too) ===")
        labels = {
            "code_blocks": "code blocks (must be identical)", "inline_code": "inline code",
            "urls": "URLs", "emails": "emails", "paths": "file paths", "handles": "@handles / #refs",
            "versions": "version strings", "numbers": "numbers/quantities", "quotes": "verbatim quotes",
            "names": "names / capitalized terms", "disclosures": "disclosure lines",
        }
        for key, lab in labels.items():
            m, ad = results[key]["missing"], results[key]["added"]
            if not m and not ad:
                continue
            print(f"\n{lab}:")
            if m:
                print(f"  MISSING in rewrite: {m[:12]}{' ...' if len(m) > 12 else ''}")
            if ad:
                tag = "added (info: fiction mode)" if a.fiction and key in {"names", "numbers"} else "ADDED in rewrite (verify it is sourced, not invented)"
                print(f"  {tag}: {ad[:12]}{' ...' if len(ad) > 12 else ''}")
        print(f"\nnegations: {neg_o} -> {neg_r}   qualifiers (may/might/only/about...): {mod_o} -> {mod_r}")
        if qualifier_warning:
            print("  WARNING: fewer negations or qualifiers. Check that no condition, limit, or uncertainty was dropped.")
        print(f"\nitems to review: {problems}")
        if problems == 0 and not qualifier_warning:
            print("No mechanical preservation problems found. That is not proof the meaning survived.")
    return 1 if problems or qualifier_warning else 0


if __name__ == "__main__":
    sys.exit(main())
