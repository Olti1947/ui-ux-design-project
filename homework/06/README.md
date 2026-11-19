---
week: 06
neptun: NEPTUN
---

# HW06 – Low-fi wireframes

**Figma file:** [HW06 – Wireframes](https://www.figma.com/design/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=2-2) (wireframe components in the section "wf components")

## What was completed

7 black-and-white wireframes built with Auto Layout, from the HW05 flow:

| Frame | Role in the flow (HW05) |
| --- | --- |
| `01 Today / card` (mobile 390×844) | **Main and decision screen**: worth it? → Read / Save / Not interested / Next |
| `01 Today / card – large` (tablet 834×1194) | Large-screen version of the main screen |
| `02 Reader` | "yes, now" branch |
| `03 Today / saved toast` | **Confirmation**: "Saved" |
| `04 Done for today` | E3, the end of the task (success) |
| `05 State / offline` | **Critical state** E1 |
| `06 State / full text not available` | **Critical state** E2 |

The screens are connected with arrows labelled with the flow step. Complex elements are annotated (swipe vs. Next button, progress, toast and undo, what the end screen offers).

## Layout note

- **Main action and hierarchy (Today card).** The card is read top to bottom in the order of the decision from HW02 insight 1. First the *title*. Then the *summary* (the biggest text block). Then *source · reading time* together, because they answer "worth it, and does it fit?". Then the actions. **Read** is the only filled (primary) button, full width, at the bottom in thumb reach. **Save** is secondary, and **Not interested** is a quiet text button, so the eye lands on reading, not dismissing.
- **Progress** ("12 of 30 today") sits at the top as a quiet status line, not a big counter. It informs without pushing.
- **Next.** Swipe up is the fast path. A visible "Next ↓" button is the accessible alternative (audit U5/A2).
- **End screen.** It has one message, one secondary path (Saved) and a "Close". It deliberately has no "load more" (HW01 constraint).
- **Large screen.** The card becomes a centred reading column (max. about 640 px wide), with the actions moved to the right of the summary. The width is limited for line length, not stretched.
- **Why Auto Layout.** Every card section is a vertical Auto Layout stack, so a longer title or summary pushes the content down instead of overlapping, which the audit's A3 (resize text) requires. Spacing comes from Auto Layout gaps (8/16/24), not from hand-placed positions.
