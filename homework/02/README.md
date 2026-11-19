---
week: 02
neptun: NEPTUN
---

# HW02 – User research, persona and journey

> **Participants are AI-simulated** (approved by the instructor). See [SIMULATED-PARTICIPANTS.md](../../project/docs/research/SIMULATED-PARTICIPANTS.md). Findings are plausible, not observed, and are marked [SIM].

**FigJam board:** [HW02 – Research](https://www.figma.com/board/W4Gs0oGtEFQ4dl8Rn5Tapv/UX-UI-2026-TechTok-Research-boards?node-id=2-124)

## What was completed

- One-page [research plan](../../project/docs/research/research-plan.md), [session script](../../project/docs/research/session-a-script.md) and [note template](../../project/docs/research/notes-template.md).
- 4 semi-structured interviews (SIM-P1 to SIM-P4). [Anonymized notes](../../project/docs/research/notes-SIM-P1-P4.md).
- Interview summary, affinity map (28 notes, each labelled quote, observation or interpretation), 3 insights, a persona and a journey map for one task.

## Interview summary [SIM]

**Who:** 4 university students aged 20–25: CS, economics, medicine and mechanical engineering. All of them use their phone in breaks every day.

**Questions:** the last few free minutes on the phone, how they got into the app, how long it lasted versus what they intended, what they remember, how they felt, their last longer read, saving for later, and their attempts to control their phone use. The idea was mentioned only at the very end.

**Important answers:**
- In all 4 cases, the social app was opened **without a decision** ("my thumb just goes there", "it's my reward").
- Breaks stretched 2–4× beyond what they intended. Afterwards they recalled almost nothing from short-video feeds (SIM-P1, P3, P2).
- Longer reading happened only when **someone recommended it** (P1) or **on a laptop, with time** (P2, P4). On the phone they avoid starting long things because they don't know whether they'll finish (P2).
- "Save for later" piles up and isn't revisited (P1 has 40 tabs, P2 calls it "a graveyard", P4 has 300 bookmarks).
- One-tap-dismissable screen-time limits get dismissed (P1, P3). Turning off notifications was the one control reported as working (P4).
- Topic breadth matters: P3 is "not into tech".

**Lessons:** (1) the trigger is habitual unlocking, (2) people decide whether to read from a preview and the time it takes, (3) an end that feels natural beats a limit you can dismiss, and (4) saving alone doesn't help without a way back to what you saved.

## Insights

| # | Observation (evidence) | Interpretation | Design consequence |
| --- | --- | --- | --- |
| 1 | P2 #8 and P4 #8: people don't start articles on the phone because they don't know whether it's worth it or how long it takes. P4 #4: reads headlines, not articles. | What blocks reading is uncertainty about value and time, not a lack of content. | Every card must answer "what is it about, and how long will it take?" **before** opening: summary + reading time + source. |
| 2 | P1 #10 and P3 #10: screen-time limits are dismissed with one tap. P3 #11: "I wish the break ended by itself." | Limits that interrupt you feel like an obstacle to get around. A finish that is part of the content feels different. | The daily set has a **visible finite size and a calm end screen**. No "+15 min" option, so there is nothing to dismiss. Progress has to be understood (see label check: "12 of 30" failed 2/4). |
| 3 | P1 #9, P2 #9, P4 #9: saved items pile up and are never revisited. | Saving moves the decision to later, and "later" rarely comes. | Saved needs to be **small and finishable**: show reading time, mark items read, and offer Saved on the end screen as the place to go next. |

## Persona [SIM-based]

**Dóra, 22, university student (composite of SIM-P1 to P4).** Tags: [R] = from the (simulated) notes, with a reference · [A] = assumption.

- **Situation:** has several 5–20 minute gaps a day (between lectures, tram, canteen queue, evenings) [R: P1–P4 #2]. Unlocks the phone and lands in a short-video or social feed without deciding to [R: P1 #3, P3 #3].
- **Goal:** use those gaps on something "light but not stupid" that they'll remember, then get back to their day [R: P3 #8, P4 #11].
- **Knowledge:** comfortable with swipe feeds. Doesn't know what RSS is and doesn't follow blogs directly [A]. Is wary of clickbait headlines and of whether AI summaries are accurate [R: P4 #8, P3 label check].
- **Constraint:** time is fragmented and they don't know in advance how long the gap will be [R: P2 #8]. They read on the phone, one-handed, often standing [A].
- **Risk:** if the calm option is less convenient than the social app, the habit wins [R: P1 #3; A: that it would win]. If the limit feels like a punishment, they leave for Reddit [R: P2 #12, opinion].
- **Quote:** "I want fewer, better things. Not more feeds." [R: P4 #11]

## Journey map: "Use a short break on the phone" (today, without our app) [SIM]

| Step | 1 Break starts | 2 Unlock | 3 Scroll | 4 Notice time | 5 Back to the day |
| --- | --- | --- | --- | --- | --- |
| **Action** | Lecture ends, ~10 min free | Unlocks, thumb opens a social app | Swipes short videos or posts | Sees the clock / next lecture starting | Closes the app, hurries |
| **Thinking / feeling** | 🙂 "I deserve a break." | 😐 automatic, no decision | 🙂→😐 entertained, then numb | 😟 "Already?" | 😞 "What did I even watch?" |
| **Pain point** | No idea what to do with 10 min | Default is the most addictive app | No natural stopping point | The limit nudge gets dismissed | Nothing remembered, guilt |
| **Opportunity** | Offer something sized to the gap | Be one tap away (home-screen widget, idea) | Finite set, visible progress | End is part of the content, not an interruption | Something worth remembering: saved or read |
