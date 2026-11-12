# Davar Hebrew

A free, installable web app (PWA) for learning to read the Hebrew Bible:
picture lessons with audio, listen-and-tap practice, spaced review, a speaking coach,
letter naming, tracing, and writing practice, and Scripture reading with tap-to-gloss.
No accounts or server; progress stays on each device.

## Files

- `index.html`, `styles.css`, `app.js` — the app
- `data/lessons.js` — all lesson content (add new lessons here)
- `audio/` — one `.mp3` per word or sentence, named to match each item's `audio` field
- `sw.js` — offline support (generated; see below)
- `manifest.webmanifest`, `icons/` — install-to-home-screen setup
- `CURRICULUM.md` — the plan for lessons 1–20

## Adding a lesson

1. Add the lesson object to `data/lessons.js`.
2. Put its audio clips in `audio/`.
3. Run `python tools/make_sw.py` so the new files work offline.

## Trying it on your computer

From this folder run `python -m http.server 8000`, then open http://localhost:8000.
(Opening `index.html` directly from disk won't load the audio or offline support.)

## Publishing for free

Any static host works. Two good options:

- **Cloudflare Pages**: create a project, choose "Upload assets," and drag in this folder.
- **GitHub Pages**: push this folder to a repository and turn on Pages in its settings.

## Notes

- The speaking coach uses the browser's built-in speech recognition (Chrome sends audio to Google,
  Safari to Apple). It needs an internet connection and a secure page (https or localhost).
  It checks against modern Israeli pronunciation and can't judge fine vowel sounds.
- The writing checker compares your drawing with every letter. It catches wrong shapes well but can't
  always tell look-alikes apart (ב/כ, ד/ר, ה/ח/ת, ו/ז/ן, ס/ם), so it shows the outline to compare.

- Audio is a placeholder ElevenLabs voice in modern pronunciation, to be replaced with recordings.
- Pictures are emoji placeholders, to be replaced with lesson art.
