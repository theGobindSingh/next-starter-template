# Component Guide — Depth Models and Interaction Models

For each component type, this guide describes:
- Visual intent (what the user should perceive)
- Depth model (which elevation state and why)
- Interaction model (how states transition)
- Accessibility implications
- Common mistakes and corrections

---

## Buttons

### Visual intent
The button should look like a physical object the user can press. It should be identifiably
interactive before the user interacts with it.

### Depth model
- Default: Raised. The button protrudes from the surface, inviting a press.
- Hover: Slightly more raised OR a subtle color shift. Confirms interactivity.
- Active/Pressed: Inset. The button physically depresses.
- Disabled: Flat. Shadows removed entirely. Opacity reduced. Cursor: not-allowed.

### Supplementary cues required
Shadow alone cannot signal whether a button is pressed vs unpressed on low-contrast displays.
Always pair with at least one of:
- Icon change (outline → filled)
- Background color accent on active state
- Text change (e.g., label updates on confirm)

### CTA buttons: Do not neumorphize
Primary call-to-action buttons should retain high-contrast solid fill. The risk of a user
not identifying the primary action is too high. Neumorphism can be applied to secondary
buttons if supplementary cues are present.

### Common mistakes
- Using shadow inversion as the only active state indicator → invisible on low contrast
- Making the button too small for shadow to read → minimum touch target still applies
- Forgetting disabled state → looks like default raised, which confuses users

---

## Input Fields (Text Inputs, Dropdowns, Textareas)

### Visual intent
The field should appear as a receptacle — a void waiting to receive content. The inset
model reinforces this: you're dropping your input into a recessed space.

### Depth model
- Default: Inset. The field is a depression in the surface.
- Focus: Inset + supplementary focus ring (border or outline). Must be clearly visible.
- Filled: Inset. Content inside. The recessed space now contains text.
- Error: Inset + semantic color border (typically red-toned border or icon).
- Disabled: Flat, opacity reduced.

### Supplementary cues required
Focus state is critical. The default browser outline is insufficient inside a shadow context.
Implement a custom `:focus-visible` style: a border in a color that achieves 3:1 contrast
against the input background, or an outer glow that sits outside the shadow context.

### Common mistakes
- Field blends into the background when unfocused — add a very light inner shadow or
  a subtle 1px border even in the default state to delineate the field bounds
- Focus state relies only on increased shadow intensity — add a visible border or outline
- Error state has no visual distinction from default — must add semantic color signal

---

## Cards and Panels

### Visual intent
Cards organize related content into a cohesive unit. They should feel like a distinct
surface tile elevated from the background.

### Depth model
- Default (non-clickable): Raised, subtle. The card is identifiable but not calling attention.
- Default (clickable): Raised, slightly more pronounced. The elevation signals interactivity.
- Hover (clickable): Increased elevation. Confirms it responds to interaction.
- Active (clickable): Inset or slight elevation decrease.

### Hierarchy consideration
In a layout with multiple cards, the shadow values must be consistent. Cards at the same
level of importance should have identical shadow properties. Varying shadow values between
same-level cards creates false hierarchy and visual confusion.

### Common mistakes
- Too many neumorphic cards in a data-dense layout → visual fatigue, hierarchy collapse
- Very large cards with the same offset as small elements → offset should scale with size
- Nested cards (card within card) using the same shadow values → must compress inner shadows

---

## Toggles and Switches

### Visual intent
The toggle is a physical switch. The track is the rail; the thumb is the moving part.
On/off must be visually unambiguous.

### Depth model
Track:
- Off: Slightly inset (empty rail)
- On: Inset with color fill (active rail)

Thumb:
- Both states: Raised (the movable element sits above the track)
- Position changes left/right (or right/left) to indicate state

### Supplementary cues required: MANDATORY
Color change on the track or thumb is non-negotiable for toggles. The shadow difference
between left-off and right-on positions of a monochrome toggle is imperceptible to many
users. Add:
- Track fill color change (e.g., neutral → brand accent)
- OR icon change on the thumb (e.g., moon → sun, outline → filled)
- Consider a label ("On" / "Off") for critical toggles

### Accessibility
`role="switch"` with `aria-checked` state must be programmatically updated.

### Common mistakes
- Shadow inversion only for on/off → fails users with low vision entirely
- Thumb and track at similar elevation → thumb doesn't read as "on top of" the track
- No accessible state announcement → screen readers cannot report the toggle state

---

## Sliders / Range Inputs

### Visual intent
A slider is a knob on a track. The track is a groove; the knob is the movable element.

### Depth model
Track:
- The entire track: Inset (a groove in the surface)
- Filled portion (from min to thumb): Color fill to indicate progress/value
- Unfilled portion: Inset, neutral

Thumb:
- Raised circle/pill — sits above the track

### Supplementary cues required
The color fill on the track is essential. Without it, users cannot perceive where they've
dragged the thumb to.

### Common mistakes
- Monochrome track with monochrome thumb → no visual feedback for value position
- Very thin track → shadows become invisible at small sizes; use a minimum track height
- Thumb too small → fails touch target requirements (minimum 44×44px)

---

## Checkboxes and Radio Buttons

### Visual intent
Small embossed surfaces that transition to visually distinct selected states.

### Depth model
Unchecked/Unselected:
- Raised (embossed square or circle) — it exists, waiting to be marked

Checked/Selected:
- Inset + check mark or radio dot with fill color

### Supplementary cues required: MANDATORY
Color-filled checkmark or radio dot is required. The inset transition alone (shadow flip)
will be invisible at small sizes. Use:
- A colored filled check/dot symbol
- Optionally: a background color change on the inner area

### Accessibility
`aria-checked` must reflect the state. Visual label must be adjacent and associated.
Touch target should meet minimum size even if the visible form element appears small.

### Common mistakes
- Relying on shadow change only at ~16–20px element size → shadows too small to perceive
- No label association → useless to screen readers
- Indeterminate state not addressed → needs a distinct visual treatment

---

## Navigation

### Visual intent
Navigation must be instantly legible. Users rely on navigation to orient themselves and
move through a product. Any ambiguity here causes functional failure.

### Depth model
Navigation should use **minimal or no neumorphism** as a rule.

If neumorphism is applied:
- Nav background/container: very subtle raised treatment only
- Active/current item: Inset to indicate "you are here"
- Hover item: Minimal elevation increase

Critical rules:
- Text and icon contrast must not be compromised by the neumorphic background
- Active state must be high-contrast and unambiguous (cannot rely on shadow alone)
- Tab order and focus styles remain fully conventional

### Common mistakes
- Applying heavy neu shadows to navigation items → reduces contrast, causes confusion
- Using shadow inversion for current-page indicator → too subtle for functional navigation
- Removing default focus outlines without replacement → keyboard users lost

---

## Dialogs and Modals

### Visual intent
A dialog should feel like a panel floating above the main content. It occupies a higher
elevation than anything on the page.

### Depth model
- Container: Raised, highest elevation on the screen
- Interior: Content remains flat — do not apply inner neu elements that compete with the dialog itself
- Optional: A subtle thin border to separate the dialog from the overlay background

### Common mistakes
- Dialog shadows are too similar to card shadows → dialog doesn't feel elevated
- Over-applying neu inside the dialog → nested shadows create visual noise
- Forgetting that the overlay itself reduces the contrast available for dialog separation

---

## Tables and Data Displays

### Rule: Do not neumorphize tables.

Data-dense tables require:
- Maximum text contrast
- Clear row/column differentiation
- Rapid scanning without visual noise

Neumorphism adds shadow noise that interferes with data readability. At most, the table
*container* can have a subtle raised card treatment. The table interior remains completely flat.

---

## Dashboards

### Approach: Structural components flat; feature elements selectively neu.

- Grid and layout scaffolding: Flat
- KPI cards / metric tiles: Raised, subtle neu (good candidate)
- Charts and data visualizations: Flat + high contrast always
- Filter controls / toggles: Neu with mandatory state cues
- Navigation: Flat, no neu
- CTAs and action buttons: Flat, high-contrast fill

The dashboard container as a whole may use a neumorphic base color, giving the full
canvas a warm depth. Individual data elements within it remain flat for clarity.

---

## Forms

### Approach: Inputs use inset treatment; form container uses raised treatment.

- Form container/card: Raised
- Input fields: Inset
- Labels: Flat (pure text, no shadow)
- Submit button (primary): Flat + high-contrast color (do not neu the primary CTA)
- Secondary actions: May use neu
- Required field indicators: Semantic color (do not rely on shadow to communicate this)

The overall form feels cohesive: the container is a raised tray, the fields are inset
receptacles within it, and the submit action breaks the neu aesthetic intentionally to
signal its importance.
