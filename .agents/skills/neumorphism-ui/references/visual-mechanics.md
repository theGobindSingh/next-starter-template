# Visual Mechanics Reference

## Depth Perception Physics

Human depth perception in 2D surfaces relies on learned light behavior cues:
- Light sources in nature come from above
- Objects above a surface cast shadows downward and to the side
- Objects below (inset into) a surface have shadows at their interior top edge

Neumorphism exploits these learned associations. The brain interprets the dual-shadow pattern
as a physical object because it maps to real-world lighting physics.

### Why the dual shadow works:
A single shadow (e.g., standard CSS `box-shadow`) reads as "drop shadow" — the element
floats *above* the surface. Dual shadows (one light, one dark) on opposite sides read as
"embossed from the same surface" because they imply a light source *hitting* the material
from a specific angle, which creates both a lit face and a shadowed face on the same object.

---

## The Material Surface Model

Conceptualize neumorphism as a single slab of uniform material:
- The screen is a plane of this material
- Elements are *physically part of* the same material, not layered on top of it
- The material is illuminated by a light source from a consistent direction
- Raised elements catch light on their upper-facing surfaces and cast shadows below
- Inset elements expose their interior walls to different lighting than the outer surface

This "same material" concept is why color must match: if an element has a different color
than its parent, it breaks the material metaphor. It now reads as a sticker on the surface,
not a part of it.

---

## Light Source Behavior

### Establishing direction:
Choose one. The convention (and the most natural) is top-left. This mimics how north-facing
rooms receive light from the upper-left in the northern hemisphere, and is consistent with
how Western users process light in physical environments.

### Consequences of direction choice:
- Light shadow falls on the side facing the light source
- Dark shadow falls on the opposite side
- Inset elements: same logic, but applied to inner faces

### Color temperature of shadows:
Real-world shadows on warm-tinted surfaces shift cool (because skylight is blue-shifted).
This can be applied subtly in neumorphism: on warm-toned bases, the dark shadow can be
slightly cool-shifted; the light highlight can be slightly warm-shifted. This is optional
but increases realism.

---

## Shadow Composition Deep Dive

### Component 1: The highlight shadow
- Direction: toward the light source
- Color: the base background color, lightened
- The lightening amount should not create pure white — that breaks the material illusion
  and looks like a spec highlight rather than a soft shadow
- The color lightening should preserve the hue of the background

### Component 2: The shadow shadow
- Direction: away from the light source
- Color: the base background color, darkened
- Can include a very subtle hue shift (e.g. slightly warmer or cooler)
- Should not approach pure black — that creates harsh contrast, not softness

### The soft zone:
The area between where the element edge ends and where the shadow fully dissipates is the
"soft zone." The width of this zone (controlled by blur radius) determines how "soft"
the material feels. A narrow soft zone = rigid plastic. A wide soft zone = foam or clay.

---

## Surface Relationships and Elevation

### Elevation as a relationship:
Elevation in neumorphism is not absolute — it is relational. An element is elevated *relative
to its container*. This means:
- A raised card on a page is elevated relative to the page
- An interactive element inside the card should be elevated relative to the card, not the page
- The shadow values of nested elements should be calibrated to the nesting depth

### Elevation compression:
As elements nest deeper, the absolute elevation differential between levels should decrease.
A deeply nested element has very little physical space to cast a meaningful shadow without
overwhelming the parent. Compress the shadow offset and blur as nesting depth increases.

### Visual weight and perceived elevation:
Larger elements naturally appear more elevated at the same shadow values than smaller elements.
To maintain consistent *apparent* elevation across elements of different sizes, slightly reduce
offset values for larger elements (or increase for smaller ones) proportionally.

---

## Transition and Animation Logic

Shadow transitions should feel physical:
- Press → inset: the shadow should "move" from outer to inner in a single smooth transition
- Hover lift: a very gentle increase in offset creates a "rising" sensation
- Release → raised: the reverse of press

Velocity curves:
- Entry (rising): ease-out — the element decelerates as it reaches its elevated position
- Exit (pressing down): ease-in — the element accelerates as it's pushed in
- Natural physics preference for shadow animations

Duration:
- Shadows animate best at short durations; longer animations make them feel sticky
- Err toward faster rather than slower
- Always check `prefers-reduced-motion` and disable animation entirely when set

---

## Shape Language and Its Relationship to Depth

### Rounded corners and depth:
High border-radius creates a shape that has more "thickness" at its center. Flat corners
create sharp edges that are harder to illuminate realistically. Neumorphism's rounded forms
are not merely aesthetic — they make the shadow-and-highlight system more believable because
rounded objects in the real world catch light predictably.

### Consistency of radius:
All elements should share a consistent border-radius vocabulary. Mixing sharp-cornered
elements with heavily rounded ones within the same material breaks coherence. Establish
a radius scale at the design system level and use it consistently.

### Shape and affordance:
- Pill shapes (high radius) read as buttons or switches
- Square cards with moderate radius read as content containers
- Circular elements read as knobs, icons, or avatars

The shape language should reinforce the interaction model: physical metaphors help users
intuit what an element does before they interact with it.
