---
week: 03
neptun: NEPTUN
---

# HW03 – Usability and accessibility audit

> **Status: confirmed.** All findings below were checked by hand on my own phone in the Inshorts app on 2026-11-20, including the screen-reader check for A2 and the large-font check for A3. They are not simulated. Screenshots are in [`screenshots/`](screenshots/) and in the Figma audit section; contrast values were measured from the screenshot pixels.

**Figma file:** [HW03 Audit · HW10 Slides](https://www.figma.com/design/TLbUCP4baTpzxXn01RrSLI/UX-UI-2026-TechTok-Design?node-id=1-3) (section "HW03 – Audit")

## Context

**Service:** Inshorts (Android/iOS), a news app that shows each story as a 60-word summary card. You swipe vertically to the next card and tap to open the full article on the publisher's site.
**Who it's for:** people who want a quick overview of the news on their phone.
**Audited task (one task only):** *"In a short break, find one story worth reading in full and open it."* Starting from the app's launch, until the full article is open.
**Why this app:** it solves the same task as my project with the same pattern (summary cards, vertical swipe), but with the opposite business model (ads, an endless feed).
**Persona:** Dóra (HW02). They have 5–20 minute gaps, decide from a preview, and the habit wins if anything gets in the way.

## Findings

Severity: 1 = cosmetic, 2 = minor, 3 = major, 4 = blocks the task.

| # | Screen / element (screenshot) | Problem (observable) | Heuristic / WCAG | Consequence for Dóra | Fix direction |
| --- | --- | --- | --- | --- | --- |
| U1 | Card bottom: "Tap to know more · at Aninews" bar ([screenshot](screenshots/u1-read-more.jpg)) | Opening the full story is a grey bar at the very bottom edge. It names the publisher but not that it leaves the app for a web page, or how long the article is. | Nielsen #6 Recognition rather than recall · Fitts's law (target at the edge) | Can't tell whether opening it will "cost" the break, so stays on summaries (matches HW02 insight 1). | A clear button with the destination and reading time: "Read on [source] · 6 min". |
| U2 | Card meta row: "few hours ago \| Garima Garg \| Hindustan Times" ([screenshot](screenshots/u2-meta-row.jpg)) | Time, author and source only. No reading time for the full article, and the time is vague ("few hours ago"). | Nielsen #1 Visibility of system status | Can't judge whether it fits the gap, which is the exact blocker from HW02 (P2 #8). | Show the estimated reading time on every card. |
| U3 | Feed | There is no end: after N cards, more keep coming, and there is no progress indication. | Nielsen #3 User control and freedom · humane design | The break has no natural end, which is the problem from HW01. | A finite set with visible progress and an end state. |
| U4 | Ad card in "My Feed" (Visa, [screenshot](screenshots/u4-ad-card.jpg)) | A full-screen ad appears between news cards with the same frame and tabs, and **no visible "Ad" or "Sponsored" label** at all. | Nielsen #4 Consistency and standards · *deceptive pattern: disguised ad* (see below) | Wastes the swipe budget, and lowers trust in every card. | Visually distinct ad style with a clear label, or no ads inside the reading flow. |
| U5 | Swipe gestures ([screenshot](screenshots/u5-gestures.jpg): "insights" carousel) | Navigation is gesture-only: vertical swipe for the next story, and inside "insights" cards a horizontal swipe ("Swipe left to learn more", 11 dots). There is no button or tap alternative for "next". | Nielsen #4 (two swipe directions with different meanings) · WCAG 2.5.1 Pointer Gestures | A first-time user, or someone using one hand on a moving tram, can mix up the two directions or not discover them. | A persistent subtle affordance (peek of the next card) plus a tap/button alternative. |
| A1 | Meta text and "Tap to know more" bar ([screenshot](screenshots/a1-contrast.jpg); also [U2](screenshots/u2-meta-row.jpg)) | **Measured on the screenshots:** meta text #A7A7A7 on #FFFFFF = **2.41:1**. On a card whose media failed to load, the "Tap to know more / Tap here" text is #D9D9D9 on #B3B3B3 = **1.49:1**, so it looks disabled. (Summary text #5F5F5F on white = 6.39:1 passes.) | WCAG 1.4.3 Contrast (Minimum), 4.5:1 for small text · Nielsen #9 (the failed-media state only says "Couldn't load Media") | Source credibility, which Dóra uses to judge clickbait, is hard to read outdoors, and the way to the full story disappears on the error card. | Meta text ≥ 4.5:1. Keep the read-more action at full contrast in every state. |
| A2 | Whole task with the **screen reader** (TalkBack / VoiceOver) — **manual check** | Check: can you move to the next card and open the story using screen-reader gestures only? Are icon buttons (share, bookmark) announced with a name, or as "button"? | WCAG 2.1.1 Keyboard / operable without gestures · 4.1.2 Name, Role, Value | A user with a screen reader can't complete the task, or doesn't know what buttons do. | Name every icon button. Offer an accessible "next story" action. |
| A3 | Card text at **largest system font size** — manual check | Check: does the summary get truncated or overlap the image when the OS font size is increased? | WCAG 1.4.4 Resize Text | Users with low vision lose the summary, which is the whole value of the card. | Text that reflows and scrolls inside the card. Don't use fixed-height text boxes. |

## Manual check: how to do A2 (≈10 min, required)

1. Android: Settings → Accessibility → TalkBack → On. iOS: Settings → Accessibility → VoiceOver.
2. Open Inshorts. Swipe right with one finger to move through elements, and double-tap to activate.
3. Try the task: reach the second story and open its full article.
4. Write down what you hear for each icon button, and whether you could reach the next card. Take screenshots.
5. Turn the screen reader off (same path; on iOS, triple-click the side button if you set the shortcut).

## Deceptive patterns and fair alternatives

| Pattern (confirmed) | Where | Fair alternative |
| --- | --- | --- |
| **Disguised ads**: sponsored cards styled like news | Feed | Clearly different style and label, or a separate ad slot outside the swipe flow. |
| **Infinite scroll with no stopping cue** (attention capture) | Feed | A finite set, progress shown, an end screen. |
| **Notification nagging**: permission prompt on first run, breaking-news pushes | Onboarding / OS | Ask only after value has been shown, explain what will be sent, offer an easy "fewer notifications" option. |

## States of the audited task

| State | Present? (check) | Note |
| --- | --- | --- |
| Normal | ✔ | Card feed |
| Loading | ? | Is there a skeleton or spinner when cards load slowly? (Test in airplane mode → off.) |
| Empty | ? | Probably never, because the feed is endless. That is the problem itself. |
| Error | ? | Airplane mode on: is there a message and a retry, or a blank card? |
| Success | weak | Opening the article just jumps to a web view. There's no confirmation of where you are or how to come back. |
| Disabled | ? | Any greyed controls, for example bookmark when logged out? |

## Persona update

Added to Dóra's **Risk**: "Ads and sponsored items mixed into a feed lower trust in every card [audit U4]." Added to **Constraint**: "Often reads one-handed while standing [A, to verify]: the gesture alternatives in U5 matter."

## 3 risks for my project and prevention

| Risk | Prevention |
| --- | --- |
| **Swipe-only navigation** excludes screen-reader and one-handed users (as in U5/A2). | Every card has a named "Next" action. Icon buttons have labels. Test with TalkBack once. |
| **"12 of 30" progress and "Daily limit" misunderstood** (HW02 label check: 2/4 and 3/4 misread). | Use clearer wording ("12 of 30 today", "Cards per day"), then test it in HW07/HW08. |
| **Small grey meta text** (source, reading time) fails contrast, though Dóra needs it to judge value. | The meta colour must reach ≥ 4.5:1. The Reading Room `muted` colour is 5.58:1 on surface. Check it in HW08. |
