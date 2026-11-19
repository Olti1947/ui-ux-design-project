---
week: 09
neptun: NEPTUN
---

# HW09 – Iteration, components and mini design system

> **Test participants are AI-simulated** (instructor-approved). See [SIMULATED-PARTICIPANTS.md](../../project/docs/research/SIMULATED-PARTICIPANTS.md).

**Figma file:** FIGMA_LINK (pages "HW09 – Design system" and "HW09 – Handoff")

## What was completed

A decision log of 4 iterations, a retest of iteration 2 against its success criterion (with limitations), a mini design system on its own page (buttons, input, card, toast, tab bar, topic chip, all with state variants), one handoff-ready screen (Today card), and a proposed next step.

## Decision log

| # | Evidence (finding) | Hypothesis | Change | Rejected alternative | Expected effect | Open question |
| --- | --- | --- | --- | --- | --- | --- |
| **1** (v1 → v2) | HW07: SIM-P5 tapped the image, then the title, before finding "Read" ("Can't I just tap the article?") | If the whole card body opens the reader, first-time users will open an article without wrong taps. | Card body (image, title, summary) = tap target → Reader. "Read" button kept. | Remove the Read button: rejected, because screen-reader users need a named action (HW03 risk 1). | 0 wrong taps on T1 | Will people open articles by accident while swiping? (Watch in the real app.) |
| **2** (v2 → v3) | HW08 F1: 0/3 passed T2. "18 left today" read as homework, lives running out, or loss | If progress names what was *seen* and states there's no need to finish, users will read it as a ceiling, not a quota. | "12 of 30 seen today" + first-card hint "Up to 30 cards a day. No need to see them all." | (a) Remove the counter entirely: rejected, because the end must not be a surprise (HW02 insight 2). (b) Progress bar only: rejected, because a filling bar invites completing it. | T2 passed without quota or loss framing | Does the number alone work after the hint is gone (day 2+)? |
| **3** (v2 → v3) | HW08 F2: P6 hesitated 8 s on "Not interested" ("mute the whole site?") and missed the 2.5 s toast | If the toast states the scope and stays long enough, users will use the control without fear and can undo. | Toast: "Hidden this article. You'll see fewer like it." 6 s, or until the next swipe; 48 px Undo | A confirmation dialog before hiding: rejected, because it adds a step to a frequent action. Undo is cheaper (error recovery over prevention). | No hesitation > 5 s; Undo reachable | Should "less from this source" be a separate option? |
| **4** (v2 → v3) | HW08 F3: P5 tapped "Read on … ↗" in the meta line by mistake ("Where am I?") | If leaving the app is a labelled button with the destination, nobody leaves by accident. | "Open on Example Blog ↗" as a secondary button in the top bar and at the end of the article | Keep the link but add a confirmation: rejected, because it's friction on a deliberate action. | 0 accidental exits | — |

## Result check: iteration 2 [SIM]

- **Criterion (from the HW08 T2 definition):** the participant explains the top line as cards seen or available today **without** describing it as something to finish or lose.
- **Before (v2, HW08):** 0/3 passed.
- **After (v3, retest with SIM-P2, new participant):** 1/1 passed: "I've looked at twelve today, there are up to thirty… more like a page count in a magazine." Main task still completed (1:35). [Notes](../../project/docs/research/retest-HW09-SIM-P2.md)
- **Limitations:** a single simulated participant. They read the first-card hint, so the test shows the *hint + number* works, not the number alone. A simulated participant is likely to respond to wording the way the designer intended. **The conclusion is only "promising, retest with real students".**

## Mini design system (Figma page "HW09 – Design system")

Only components that appear on the project's screens:

| Component | Variants (property = values) | Used on |
| --- | --- | --- |
| `Button` | Type = Primary / Secondary / Text · State = Default / Pressed / Disabled | All screens |
| `Input/Number` | State = Default / Focus / Error | Settings → Cards per day |
| `Card/Article` | Image = Yes / No · State = Default / Saved | Today |
| `Toast` | Type = Saved / Hidden (with Undo) | Today |
| `TabBar` | Active = Today / Saved / Settings | All tab screens |
| `Chip/Topic` | Selected = Yes / No | Onboarding, Settings → Topics |

Naming is `Component/Subtype`, with variant properties in Title Case. Every fill, text and spacing value is bound to the HW08 variables and styles. Nothing is hard-coded.

## Handoff screen: Today card (Figma page "HW09 – Handoff")

Shows all of its states: default · no image · saved (toast) · hidden (toast + Undo) · first card with hint · loading (skeleton) · offline · the last card → Done for today. Annotations cover:
- **Behavior:** swipe up or "Next" → next card; card tap → Reader; Save toggles; toast 6 s / until swipe; "seen" counts when a card has been on screen for ≥ 1 s.
- **Accessibility:** reading order is progress → title → AI summary → source & time → Read → Save → Not interested → Next. Accessible names: "Save article", "Next article". Targets are ≥ 48 px. The "AI summary" label is read before the summary. Dynamic type: the card scrolls internally and doesn't truncate.
- **Variables:** each layer's colour and style token is listed (e.g. meta text = `color/text-muted`, `meta`).
- **Ready for dev:** the Starter plan has no Dev Mode status, so the frame has a "✅ Ready for dev" label instead.

## Proposed next step

**Test the riskiest assumption from HW01 with real people:** that students will open this *instead of* a social app. Run a 5-day diary study with 5 real students using a clickable prototype on their home screen (or a daily link). Each evening they log two things: how many times they reached for a social app in a break, and whether they opened the prototype instead. This reduces the one uncertainty no prototype test can address, and it replaces the simulated evidence with real evidence.
