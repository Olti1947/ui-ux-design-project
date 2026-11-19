---
week: 07
neptun: NEPTUN
---

# HW07 – Clickable prototype and first feedback

> **The tester is AI-simulated** (instructor-approved). See [SIMULATED-PARTICIPANTS.md](../../project/docs/research/SIMULATED-PARTICIPANTS.md).

**Figma prototype:** [Main task – v1](https://www.figma.com/proto/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=4-81&starting-point-node-id=4%3A81) · [frames](https://www.figma.com/design/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=4-78) (starting point `v1 / 01 Today / card 1`)

## What was completed

The HW06 wireframes were wired into a clickable prototype of the main task. It has a clear start (`01 Today / card`) and success states ("Saved" toast; `04 Done for today`). Two exceptional states are reachable: offline and full text not available. The prototype was tried with 1 student (simulated, SIM-P5) without verbal guidance. Observations are recorded as quotes, observations and interpretations, followed by a reflection.

## Known limitations of the prototype

- The day's set is **shortened to 3 cards** (the real default is 30) so the end screen can be reached in a test. The counter still says "of 30" on the first card, then jumps.
- **Swipe** is simulated with "Drag" on the card. It only works upwards, with no physics.
- **Not interested** shows the toast, but **Undo does nothing**.
- The **exceptional states** can only be reached through hidden hotspots (the tester can't trigger "offline" naturally). The moderator would tell the participant "imagine you lost signal" and tap it.
- **Saved** shows a static list. Settings is not wired.
- All content is placeholders (grey lines), so the "is it worth it?" decision is made on structure, not on real summaries. **This is the biggest limit on what the test can show.**

## Scenario and task

> **Scenario:** "You've just come out of a lecture and have about ten minutes before the next one. You'd like to spend them on something more interesting than your usual apps. Your phone has this app on it."
> **Task:** "Use the app to find something you'd like to read, now or later. Stop when you feel you're done."

The task doesn't name any button, screen or label ("save", "read", "next", "today"), so it doesn't reveal the solution.

## Observations (SIM-P5)

Full notes: [test-HW07-SIM-P5.md](../../project/docs/research/test-HW07-SIM-P5.md)

| # | Type | Note |
| --- | --- | --- |
| 1 | **Observation** | Tapped the image, then the title, before finding "Read". |
| 2 | **Quote** | "Can't I just tap the article?" |
| 3 | **Quote** | "Twelve of thirty today… so I have to get through thirty?" |
| 4 | **Interpretation** | The progress line reads as a quota to complete, the opposite of the calm finite message. |
| 5 | **Observation** | Never swiped. Used "Next ↓" both times. |
| 6 | **Quote** | "Oh that's nice, it just ends." (end screen) |

## Reflection

- **What surprised me:** the progress line. It passed the label check for 2 of 4 people, but in context it created *pressure*. I designed it to reassure. It's the most important thing to test in HW08.
- **What was useful:** the "Next ↓" button, added only for accessibility, was the path the tester actually used. Swipe isn't as self-evident as I assumed.
- **What I'd change (going into HW08, prototype v2):** (1) make the whole card body (image + title + summary) open the reader; (2) give the progress line new wording and test 2 alternatives; (3) keep "Next ↓" and make it a proper 48 px button.
- **Caveat:** one simulated tester. These are directions to test, not conclusions.
