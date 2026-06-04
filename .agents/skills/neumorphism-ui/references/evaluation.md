# Evaluation Engine — Neumorphic Design Review Rubric

Use this rubric when reviewing, auditing, or scoring any neumorphic design.

---

## How to Conduct a Review

1. Run the **Rapid Failure Detection** scan first. Any single failure here is a blocker.
2. Score the design across the **Six Evaluation Dimensions**.
3. Identify the **top 3 priority improvements** based on severity and effort.
4. Provide **targeted correction proposals** — not redesigns.

---

## Rapid Failure Detection (Blockers)

Any YES here requires immediate correction before the design can ship:

| Check | Pass Condition |
|---|---|
| Light source consistency | All shadows point in same direction |
| Material rule | All neumorphic elements share base background color |
| CTA/nav safety | Primary CTAs and nav are NOT purely neumorphic |
| Interactive contrast | All interactive elements have 3:1+ contrast at their boundary |
| Focus visibility | Custom focus styles implemented and visible |
| State supplementary cues | All interactive states have a non-shadow cue |
| ARIA completeness | All interactive components have correct semantic roles and states |

---

## Six Evaluation Dimensions

### Dimension 1: Depth Consistency (0–10)

Evaluate: Does the design apply a coherent elevation system?

Score 9–10: Clear elevation hierarchy, all elements at consistent and logical depths,
light source direction uniform throughout, inset/raised/flat used appropriately per component.

Score 6–8: Minor inconsistencies in shadow direction or scale; elevation hierarchy mostly
present but with some elements that are ambiguous.

Score 3–5: Multiple elements with conflicting shadow directions; elevation relationships
between components unclear; no discernible hierarchy.

Score 0–2: Shadow directions inconsistent throughout; elements appear to float randomly;
no coherent depth model applied.

**What to look for:**
- Do any two adjacent elevated elements have shadows pointing in different directions?
- Do nested elements scale their shadows appropriately (smaller shadows at deeper nesting)?
- Does the "ground plane" feel consistent?

---

### Dimension 2: Hierarchy Clarity (0–10)

Evaluate: Can a user immediately understand what is most important on the screen?

Score 9–10: Clear focal points; interactive elements distinguishable from non-interactive;
depth levels map logically to importance; typographic hierarchy reinforces the depth model.

Score 6–8: Hierarchy mostly readable but one or two elements ambiguous in their importance
or interactivity.

Score 3–5: Multiple elements at the same visual weight; unclear what to do first; decorative
and functional elements compete.

Score 0–2: No visual hierarchy; all elements appear equal; user has no guidance on where
to focus.

**What to look for:**
- What's the first thing the eye lands on? Should it be?
- Are interactive elements clearly differentiated from containers?
- Does elevation reliably predict importance?

---

### Dimension 3: Usability and Affordance (0–10)

Evaluate: Do users know what they can interact with and how?

Score 9–10: All interactive elements have supplementary cues; state transitions are clear;
no ambiguity about what's clickable; hover/active states communicate interaction model.

Score 6–8: Most interactive elements are clear; one or two rely too heavily on shadow
alone for state communication.

Score 3–5: Multiple interactive elements that rely solely on shadow for state; pressed vs
default states difficult to distinguish; affordance unclear for key components.

Score 0–2: Shadow-only state communication throughout; no supplementary cues; users cannot
reliably identify interactive vs non-interactive elements.

---

### Dimension 4: Accessibility Compliance (0–10)

Evaluate: Does the design meet accessibility requirements?

Score 9–10: All interactive elements pass 3:1 non-text contrast; custom focus styles
implemented; all ARIA roles and states present; reduced-motion handled.

Score 6–8: Most elements pass contrast; minor gaps in focus styling or ARIA; no structural
failures.

Score 3–5: Several contrast failures; inconsistent focus styling; some ARIA gaps.

Score 0–2: Systematic contrast failures; no custom focus styles; missing ARIA throughout.

---

### Dimension 5: Aesthetic Cohesion (0–10)

Evaluate: Does the design feel like a coherent, considered system?

Score 9–10: Consistent shadow vocabulary; border-radius system consistent; spacing generous
and proportional; neumorphism applied selectively and purposefully; brand alignment achieved.

Score 6–8: Mostly cohesive with minor inconsistencies in radius or spacing; selective
application mostly successful.

Score 3–5: Some components feel out of place; neumorphism applied inconsistently or on
inappropriate components; brand alignment weak.

Score 0–2: Visual incoherence; random application of effects; no design system feel.

---

### Dimension 6: System Integration (0–10)

Evaluate: Does neumorphism work within the broader design system, or does it fight it?

Score 9–10: Neumorphism treated as a surface style layer; underlying grid, typography, and
color semantics preserved; fallback styles available; brand identity maintained.

Score 6–8: Mostly integrated; minor conflicts with existing system conventions; recoverable.

Score 3–5: Neumorphism replaces rather than overlays existing conventions; some design
system tokens broken; typography or color semantics affected.

Score 0–2: Neumorphism has overridden the design system entirely; no existing conventions
survive; the interface would need to be rebuilt to function in the broader product.

---

## Interpreting Scores

| Total (out of 60) | Assessment |
|---|---|
| 54–60 | Production-ready; minor polish only |
| 42–53 | Solid foundation; address identified gaps before shipping |
| 30–41 | Requires significant work in low-scoring dimensions |
| 18–29 | Concept stage only; fundamental issues must be resolved |
| 0–17 | Recommend starting over with principles applied from the beginning |

---

## Priority Improvement Identification

After scoring, identify the top 3 priorities using this logic:

1. **Any accessibility blocker** → Highest priority regardless of score. Cannot ship.
2. **Lowest-scoring dimension** → Most impactful improvement opportunity.
3. **Highest-effort quick win** → Look for a single change that would improve 2+ dimensions.

Frame improvements as targeted corrections:
- "Add a 1px border at [target contrast] to the input fields to resolve the 3:1 contrast failure."
- "Align all shadow directions to top-left source; the cards in the sidebar are currently casting
  shadows in the opposite direction from the main content area."
- "The toggle's on/off state relies only on shadow inversion. Add a color fill to the track
  for the 'on' state to make the state change unambiguous."

---

## Design Review Output Template

When delivering a review, structure as:

**1. Blocker check** — List any Rapid Failure Detection failures and their required corrections.

**2. Dimension scores** — Score and one-sentence rationale for each dimension.

**3. What works** — Identify 2–3 genuine strengths to preserve.

**4. Top 3 improvements** — Prioritized, specific, actionable corrections.

**5. Systemic patterns** — Any recurring issue that suggests a missing principle rather
   than isolated mistakes (e.g., "The team appears unaware of the supplementary cue
   requirement for state changes — this should be addressed at the system level").
