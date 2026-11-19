---
week: 04
neptun: NEPTUN
---

# HW04 – Problem definition and opportunity search

**FigJam board:** [HW04 – Problem definition](https://www.figma.com/board/W4Gs0oGtEFQ4dl8Rn5Tapv/UX-UI-2026-TechTok-Research-boards?node-id=3-343)

## What was completed

A one-page brief and a stakeholder table, a user story, a problem statement, 4 HMW questions, 10 ideas, a 2×2 impact/feasibility matrix, and a justification for the chosen direction. Evidence and assumptions are marked throughout: **[SIM]** for simulated research (HW02), **[AUD]** for the audit (HW03), **[A]** for assumptions.

## Project brief (one page)

| | |
| --- | --- |
| **Problem** | In short breaks, students open a social feed out of habit. The break stretches 2–4× and leaves nothing they remember [SIM: P1–P4]. On the phone they don't start longer reads because they can't tell whether it's worth it or how long it takes [SIM: P2 #8, P4 #8]. |
| **Target user** | University students with 5–20 minute gaps in their day, curious about tech and general-knowledge topics (persona Dóra). |
| **Main task** | **In a short break, find one article worth your time and read it or save it, then finish for today.** |
| **Organization goal** | Send readers to the original authors, keep running costs low, and build trust with no engagement tricks. |
| **Constraints** | No infinite feed, streaks, like counts or notifications. A daily set with an end. Copyright: summary + excerpt + link to the original. One developer. Mobile first. |
| **Success criterion** | 4 of 5 testers complete the main task in ≤ 3 min without help. 4 of 5 explain the end-of-day screen correctly and don't look for more (from HW01). |
| **Exclusions** | Accounts and sign-in, social features (comments, following, sharing counts), user-added sources, the web version, monetization, the ranking algorithm, onboarding beyond picking topics. |

## Stakeholders

| Stakeholder | Interest | Influence | What it means for the design |
| --- | --- | --- | --- |
| Students (readers) | Worthwhile breaks, less guilt | High | Primary user of the main task |
| Blog authors / publishers | Traffic and credit, no content theft | Medium | "Open original" is prominent. Summary + excerpt only. |
| Developer (me) | Low cost, feasible in 3 weekends | High | Simple screens. Summaries generated once per article. |
| AI provider | API terms | Low | AI summaries labelled. Accuracy is not guaranteed [SIM: P3 doubt]. |
| App stores | Privacy policy, data deletion | Medium | Anonymous use, a "reset history" option |
| Course instructor | A process backed by evidence | High (for this project) | Document evidence vs. assumption |

## User story

> **As a** student with a 10-minute gap between lectures, **I want to** see quickly what a few good articles are about and how long each takes, **so that** I can read one that fits the gap, or keep it for later, and then put the phone down without feeling I wasted the break.

## Problem statement

> **The problem of** university students with short breaks **is that** the easiest thing to open is an endless feed, while longer reading feels risky because they can't tell whether it's worth it or whether it will fit the gap, **because of which** their breaks stretch far beyond their intention and leave nothing they remember, followed by guilt.

## How Might We

1. HMW help students tell **in seconds** whether a piece of writing is worth their break? *(insight 1)*
2. HMW give a break a **natural end** that doesn't feel like a punishment? *(insight 2)*
3. HMW make the calm option **as easy to reach** as the habitual one? *(P1 #3, HW02)*
4. HMW make "later" actually **come back**, so saved things get read? *(insight 3)*

## Ideas (10)

| # | Idea | From HMW |
| --- | --- | --- |
| 1 | **Finite daily card set**: summary cards with reading time and source, a visible "n of N today", and an end screen | 1, 2 |
| 2 | **Home-screen widget** with one article and its reading time | 3 |
| 3 | **"I have X minutes" picker**: choose 5/10/20 minutes and get articles that fit | 1, 2 |
| 4 | **Weekly digest email** of what you saved and didn't read | 4 |
| 5 | **Audio mode**: listen to the article on the tram | 1 |
| 6 | **Break timer** that ends the session with a gentle wrap-up | 2 |
| 7 | **Saved inbox with a cap**: at most 10 saved items, so you finish or drop them | 4 |
| 8 | **Friend recommendations**: one article a friend recommends per day | 1 (P1 #8) |
| 9 | **Lock-screen "instead" prompt**: replace the social app's spot with a reading shortcut | 3 |
| 10 | **Topic quiz onboarding** to pick interests beyond tech | 1 (P3 #12) |

## Impact / feasibility matrix

| | **Low feasibility** | **High feasibility** |
| --- | --- | --- |
| **High impact** | 9 Lock-screen prompt (OS limits) · 8 Friend recommendations (needs social features, which are excluded) | **1 Finite daily set** · 3 Minutes picker · 7 Capped Saved |
| **Low impact** | 5 Audio mode · 4 Digest email (needs accounts) | 2 Widget · 6 Break timer · 10 Topic quiz |

Impact is judged against the HW02 insights. Feasibility is judged against one developer, the 3-weekend MVP and the exclusions. Both are **my estimates [A]**.

## Chosen direction and why

**Idea 1, the finite daily set of summary cards, with two features from neighbouring ideas: a small Saved list (7) and topic choice (10).**

- It answers **insight 1** directly: summary + reading time + source on every card, before opening.
- It answers **insight 2**: the end is part of the content (the set runs out) rather than a timer you can dismiss. This is why idea 6 (break timer) was rejected: it repeats the one-tap-dismissable pattern that failed in P1 and P3.
- It's feasible for one developer, and it fits every constraint.
- **Not chosen:** the minutes picker (3) adds a decision at the very moment the user is acting on autopilot [A]. It's kept as a possible later test. The widget (2) helps with HMW 3, but only once the core set works. It's kept as a next step.

**Biggest open assumption:** that students will open it instead of the social app (HMW 3). The prototype can't prove this, because it's a long-term behavior. It's stated as a limitation in HW10.
