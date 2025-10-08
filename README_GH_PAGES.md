# MeetNote AI — GitHub Pages (Static)

Record speech in your browser → get an instant transcript → auto summary, highlights, and action items → download CSV/MD/SRT/VTT/TXT/JSON. Everything runs client-side.

## Quick Start
```bash
npm i
npm run dev
# build
npm run build
```

## Deploy to GitHub Pages
1. Create a new public repo and push this folder.
2. Go to **Settings → Pages → Source: GitHub Actions**.
3. The included workflow builds and publishes to the `gh-pages` branch automatically.

> Note: Web Speech API requires Chrome/Edge (best). iOS Safari uses `webkitSpeechRecognition` and may stop when backgrounded.

## Limitations
- Tab/system audio capture is browser-limited. Dictation uses mic input (Web Speech API).
- Accuracy varies by language. This project is fully local and does not send audio to servers.
