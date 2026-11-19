# HW08 usability tests: anonymized notes (AI-simulated)

> Simulated participants, see [SIMULATED-PARTICIPANTS.md](SIMULATED-PARTICIPANTS.md). Prototype **v2** (HW07 fixes: the whole card is tappable, progress reads "18 left today", 48 px "Next" button). Every session was remote, think-aloud, with no verbal help. Tasks are in the [HW08 README](../../../homework/08/README.md#test-plan).
>
> Columns: **Task** · **Observation** (what they did) · **Quote** (their words) · **Interpretation** (mine).

## Test 1: SIM-P5 (22, psychology, light user; also did the HW07 test)

| Task | Observation | Quote | Interpretation |
| --- | --- | --- | --- |
| T1 | Tapped the card body straight away → Reader. 0 wrong taps (v1: 2). | "Oh, now it opens." | The tappable card fixed the HW07 hesitation. |
| T1 | In the Reader, tapped "Read on Example Blog ↗" thinking it was the author's name. The browser opened. | "Wait, where am I?" | A link inside the meta line looks like a byline. Leaving the app is a surprise. |
| T1 | Came back, pressed Save. Success at 2:05. | — | — |
| T2 | Explained "18 left today": "I have 18 more to go." | "It's fine, but it sounds like homework." | "left" still frames it as a to-do. |
| T3 | Read the end screen, pressed "Go to Saved". | "Good. Done." | Understood the end. |

## Test 2: SIM-P6 (24, computer engineering, heavy Reddit/HN)

| Task | Observation | Quote | Interpretation |
| --- | --- | --- | --- |
| T1 | Swiped up immediately (3 cards in 6 s), then went back to card 2 and opened it. Success at 1:20. | "It's like Shorts but text." | Experienced swipers find the gesture. Fast skimming is a risk (watch SKIPPED_FAST in the real app). |
| T1 | On a card from a known source, hovered over "Not interested" for ~8 s, didn't tap. | "Does this mute the whole site? I like that site, just not this post." | The scope of "Not interested" is unclear (also 2/4 in the HW05 label check). |
| T1 | Tapped "Not interested" on another card. The toast disappeared before they looked at it. | "Did that do anything?" | The toast (2.5 s in the prototype) is too short to read and to reach Undo. |
| T2 | Explained "18 left today". | "Eighteen left… it feels like I'm running out of lives." | "left" reads as a scarce resource, which creates a pull to use them all. |
| T3 | End screen: read it, pressed Close. | "Okay, fair." | Understood. No search for more. |

## Test 3: SIM-P1 (21, CS, TikTok/Instagram; new session)

| Task | Observation | Quote | Interpretation |
| --- | --- | --- | --- |
| T1 | Used the "Next" button twice, then opened card 3. Success at 1:50. | — | The button is the main path for non-swipers (as in HW07). |
| T2 | Explained "18 left today" as "how many I've still got". | "If I don't read them, are they gone tomorrow?" | "left" implies loss: fear of missing out. |
| T3 | Scrolled the end screen once looking for more, then read the text. | "So when's tomorrow? Midnight?" | The end is understood, but the time of the next set is vague. |
| T3 | Explained it correctly: "That's it for today, new ones tomorrow." | — | Success criterion 2 met. |

## Metrics summary

| Metric | P5 | P6 | P1 |
| --- | --- | --- | --- |
| T1 success without help | ✔ | ✔ | ✔ |
| T1 time | 2:05 | 1:20 | 1:50 |
| Wrong taps | 1 | 0 | 0 |
| Hesitation > 5 s | 0 | 1 | 0 |
| T2 progress explained without loss or pressure framing | ✘ | ✘ | ✘ |
| T3 end explained correctly | ✔ | ✔ | ✔ |
| T3 looked for "more" | ✘ | ✘ | ✔ (briefly) |
