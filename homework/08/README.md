---
week: 08
neptun: P3FEII
---

# HW08 – Usability test, findings and mini UI guideline

> **Test participants are AI-simulated** (instructor-approved). See [SIMULATED-PARTICIPANTS.md](../../project/docs/research/SIMULATED-PARTICIPANTS.md). The contrast values in the guideline are calculated, not simulated.

**Updated prototype (v3):** [Main task – v3](https://www.figma.com/proto/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=4-430&starting-point-node-id=4%3A430) · [frames](https://www.figma.com/design/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=4-427) · **UI guideline:** [HW08–HW09 · UI guideline & design system](https://www.figma.com/design/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=1-2) (section "HW08 – UI guideline")

> Prototype versions: v1 (HW07) and v3 (after HW08) are kept as separate copies. The tested v2 differed from v1 only in three HW07 fixes (whole card tappable, progress "18 left today", 48 px Next button) and was not kept as its own copy, because the Figma Starter plan allows only 3 pages per file.

## What was completed

A test plan, the consent briefing, 3 moderated tests ([anonymized notes](../../project/docs/research/tests-HW08-SIM.md)), findings ranked by severity, fixes with their justification, a mini UI guideline in Figma, and prototype v3.

## Learning goals

1. Can a first-time user find an article worth their time and read or save it **without help, within 3 minutes**? (HW01 criterion 1)
2. Do users understand the **daily progress and the end of the set** as a calm, finite set, not a quota or a countdown? (HW01 criterion 2, plus the HW07 surprise)

## Test plan

- **Participants:** 3 students (simulated): SIM-P5 (light user, also in HW07), SIM-P6 (heavy Reddit user), SIM-P1 (TikTok user). The aim is a mix of swipe experience.
- **Setup:** remote, Figma prototype v2 in phone view, think-aloud, ~15 min, no help. If someone is stuck for over 60 s, that counts as a failure, and then I may help.

| Task | Scenario (read aloud) | Success criterion |
| --- | --- | --- |
| **T1** | "You've got about ten minutes before your next lecture and want to spend them on something more interesting than your usual apps. Use this app to find something you'd like to read, now or later." | Opens the reader or saves an article, unaided, ≤ 3 min |
| **T2** | (Moderator points to the top line.) "What does this tell you?" | Explains it as cards seen or available today, **without** describing it as something to finish or something you'll lose |
| **T3** | "Imagine you've looked at a lot of articles today. Continue." (prototype jumps to the last card) | Explains the end screen in their own words; doesn't look for more for over 5 s |

- **Metrics:** task success, time on T1, wrong taps, hesitations > 5 s, the T2/T3 explanations (correct ✔ / ✘).

## Consent (verbal briefing, read aloud)

> "Thanks for helping. I'm testing an early design for a university UX course. I'm testing the design, not you, so if something is confusing, that's useful to me. It takes about 15 minutes. Please think aloud while you use it. I won't help during the tasks, but I'll answer questions afterwards. I'll take notes without your name and won't record the screen or your voice. You can stop at any time and I'll delete your notes. Is that OK?"

## Results against the success criteria [SIM]

- **Criterion 1:** 3/3 completed T1 without help (1:20–2:05). ✔ (target 4/5; the sample is 3)
- **Criterion 2:** 3/3 explained the end correctly; 1/3 briefly looked for more. ✔. **But T2 failed 0/3:** "18 left today" read as homework, as lives running out, or as something you lose.

## Findings by severity

Severity: 4 = blocks the task · 3 = major (task done, but against the goal or very confusing) · 2 = minor · 1 = cosmetic or noted.

| # | Sev. | Finding | Evidence | Task | Consequence |
| --- | --- | --- | --- | --- | --- |
| F1 | **3** | The progress line "18 left today" reads as a countdown or a scarce resource | 0/3 passed T2 (P5 "homework", P6 "running out of lives", P1 "are they gone tomorrow?") | T2 | Creates the urge to "use them all", which works against the core goal (HW01 constraint) |
| F2 | **3** | "Not interested" scope unclear; the toast and Undo disappear too fast | P6 hesitated for 8 s ("mute the whole site?") and missed the toast ("did that do anything?"); HW05 label check 2/4 partly | T1 | Users avoid the control or lose a card they wanted |
| F3 | **2** | "Read on [source] ↗" in the meta line looks like a byline, and leaving the app surprises | P5 tapped it by mistake: "Wait, where am I?" | T1 | Unintended app exit mid-task, lost place |
| F4 | **2** | The time of the next set is vague | P1: "When's tomorrow? Midnight?" | T3 | Uncertainty, a reason to check the app again later |
| F5 | **1** | Swipe isn't discovered by everyone | 2/3 used the "Next" button (also HW07) | T1 | None while the button exists. Noted, no change. |

## Fixes (in prototype v3) and why

| Finding | Fix | Why this one |
| --- | --- | --- |
| F1 | Replace it with "**12 of 30 seen today**" and add a one-time hint on the first card: "*Up to 30 cards a day. No need to see them all.*" | It names *what was done* (seen) instead of *what is left*. That follows the HW05 lesson: spell out the unit and the time frame. "Left" framed scarcity for all 3 people. |
| F2 | Toast "**Hidden this article. You'll see fewer like it.**" stays **6 s** and until the next swipe; **Undo** is a 48 px button | It answers P6's exact question (this article, not the site). 6 s follows WCAG 2.2.1 (enough time) for reading plus reaching Undo. |
| F3 | Remove the link from the meta line. Add a separate secondary button at the end of the article and in the top bar: "**Open on Example Blog ↗**", announced as "opens in browser" | An action has to look like an action (affordance), and the destination is stated before tapping. |
| F4 | End screen: "**New articles tomorrow at 6:00.**" | A concrete time removes the reason to "check back". |
| F5 | No change; "Next" stays a full 48 px button | The alternative path already works. |

**Comprehensibility and accessibility:** F1 and F4 replace vague wording with concrete wording (unit, time), which helps everyone, including non-native English speakers (most testers). F2 meets WCAG 2.2.1 *Timing Adjustable* and 2.5.8 *Target Size* (Undo ≥ 24 px; we use 48 px). F3 meets 2.4.4 *Link Purpose* and 3.2.5 *Change on Request* (no surprise context change). F5 keeps 2.5.1 *Pointer Gestures*: every swipe has a single-tap alternative.

## Mini UI guideline (Figma)

Based on the project's existing "Reading Room" visual direction. Every value is a Figma variable or style.

**Colour variables, named by role** (light / dark, using groups `light/*` and `dark/*` because the Figma Starter plan allows one mode):

| Variable | Light | Dark | Use |
| --- | --- | --- | --- |
| `color/bg` | #F6F7F4 | #131816 | Screen background |
| `color/surface` | #FFFFFF | #1B221F | Cards, sheets |
| `color/text` | #1B2420 | #E6ECE8 | Titles, body |
| `color/text-muted` | #5E6B64 | #93A39A | Meta (source, reading time), hints |
| `color/accent` | #2F5D50 | #8CC7B3 | Primary button, links, selected |
| `color/on-accent` | #FFFFFF | #0F1513 | Text on the primary button |
| `color/line` | #DDE3DE | #2A332F | **Decorative** dividers only |
| `color/danger` | #B3261E | #F08A7E | Input errors |

**Contrast check (WCAG 2.x, calculated):**

| Pair | Light | Dark | AA |
| --- | --- | --- | --- |
| text on surface | 15.91 | 13.53 | ✔ (≥ 4.5) |
| text-muted on surface | 5.58 | 6.14 | ✔ |
| text-muted on bg | 5.19 | 6.79 | ✔ |
| accent on surface (links) | 7.49 | 8.44 | ✔ |
| on-accent on accent (button) | 7.49 | 9.62 | ✔ |
| danger on surface | 6.54 | 6.67 | ✔ |
| line on surface | 1.30 | 1.25 | ✘. Allowed **only** for decorative dividers. Input borders use `text-muted` instead (≥ 3:1 for UI components, WCAG 1.4.11). |

**Text styles:** `title/card` Literata SemiBold 27/33 · `title/screen` Literata SemiBold 30/36 · `body` Public Sans Regular 16/24 · `reader/body` Literata Regular 18/30 · `meta` Public Sans Regular 13/18 · `label` Public Sans Medium 12/16, +0.8 tracking, uppercase (the "AI SUMMARY" label) · `button` Public Sans SemiBold 16/20.

**Spacing:** 4 · 8 · 12 · 16 · 24 · 32 · 48 (`space/xs` to `space/xxxl`). Screen side padding is 20. The gap between card sections is 12. Between groups it's 24.

**Rules**
- **Buttons:** one primary (filled `accent`) per screen, for the main action only (Read, Open Saved). Secondary is outlined with `text-muted`. Min height 48. The label is a verb ("Read", "Save", "Open on …"). Disabled uses 40% opacity *plus* a non-colour cue (the label stays, but it's not focusable).
- **Inputs** (Settings → Cards per day): label above, never placeholder-only. Border `text-muted` (1 px), focus 2 px `accent`, error 2 px `danger` + a message below with an icon ("Choose a number from 5 to 50") so colour isn't the only signal.
- **Icons:** 24 px in a 48 px tap target. Every icon-only button has an accessible name ("Save article"). The external-link ↗ icon always sits next to text that names the destination.
