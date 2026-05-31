# Testing / Quality Rules

## Rule Q1: Lint and type correctness are baseline gates

- Treat lint and type checks as required before handoff.
- Resolve new diagnostics introduced by edits.

## Rule Q2: Match host test strategy

- If host repo has unit/integration/e2e tests, run relevant suites.
- If no test harness exists, do not invent one unless requested.

## Rule Q3: Validation sequence

1. Run diagnostics on touched files.
2. Run host lint command.
3. Run host build/typecheck command for structural changes.
4. Run targeted tests if available.
5. Perform manual UI checks for visual/interaction updates.

## Rule Q4: Minimum manual checks for UI work

- Verify desktop and phone breakpoints.
- Verify hover and touch-active parity where relevant.
- Verify CTA and route links still resolve.
- Verify semantic structure and heading order.

## Rule Q5: Drift-aware verification

- If touched areas already contain legacy drift, keep behavior stable.
- Confirm edits do not spread drift patterns.

## Rule Q6: Handoff should state what was validated

- Include commands run (or not run), results, and residual risks.
