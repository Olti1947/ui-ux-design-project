# TechTok HW builder (Figma plugin)

Builds what the Figma connector could not finish: HW08 UI guideline, HW09 design system and handoff, HW03 audit frames, HW10 slides.

## How to run (about 5 minutes)

1. Put `manifest.json` and `code.js` in one folder on your computer, for example `Documents/techtok-plugin/`.
2. Open the **Figma desktop app**. The browser version can't run development plugins.
3. Open the file **UX-UI 2026 – TechTok – Design**.
4. Main menu (Figma logo, top left) → **Plugins → Development → Import plugin from manifest…** → pick `manifest.json`.
5. Run it: **Plugins → Development → TechTok HW builder**. It takes 10–40 seconds.
6. Wait for the toast at the bottom: "Done. …". If it says "Done with N error(s)" or "Failed", open **Plugins → Development → Show/Hide console** and send Claude the red lines.

Running it again is safe: it deletes and rebuilds only its own five sections.

## What it builds

- Page 2: sections **HW09 – Design system** (variables, text styles, Button, Input, Toast, TabBar, Chip, Card components with variants), **HW08 – UI guideline**, **HW09 – Handoff** (8 annotated states, ready for dev).
- Page 3: sections **HW03 – Audit** (8 empty screenshot slots with finding cards) and **HW10 – Slides** (14 slides with a presentation flow).

## After it runs

Right-click each of the five sections → **Copy link to selection**, and send the links to Claude. Then drag your Inshorts screenshots into the HW03 slots.
