# Transmutation of Champions

A fantasy character generator and deck-building app built with React, Vite, and Express. It generates randomized fantasy heroes, creates AI-powered portrait art and backstory text, and lets you save favorites to a local deck collection.

## Features

- Random fantasy champion generation with class, race, origin, trait, and affinity
- AI portrait generation using Gemini when a key is configured
- AI backstory generation with a procedural fallback if the API is unavailable
- Recent summon history for quick re-selection
- Local deck persistence in the browser
- Responsive fantasy UI inspired by alchemy and tabletop card design

## Tech Stack

- React 19
- Vite
- Express
- TypeScript
- Gemini API via Google GenAI SDK
- Tailwind-inspired styling with custom fantasy theming

## Prerequisites

- Node.js 18+
- npm
- A Gemini API key for portrait and backstory generation

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create an environment file from the example:
   ```bash
   copy .env.example .env
   ```
   On macOS/Linux use:
   ```bash
   cp .env.example .env
   ```

3. Add your Gemini API key in `.env`:
   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

4. Start the app in development mode:
   ```bash
   npm run dev
   ```

5. Open the app in your browser at:
   ```text
   http://localhost:3000
   ```

## Production Build

```bash
npm run build
npm run start
```

The production server serves the built frontend from the `dist` directory and runs the Express API on the same app.

## Notes

- If `GEMINI_API_KEY` is not set, the app still runs and falls back to procedural portrait and backstory generation.
- The deck is stored in `localStorage` in the browser, so it persists between refreshes on the same browser.
- The app also exposes health and generation endpoints under `/api/*`.

## Scripts

- `npm run dev` - start the local development server
- `npm run build` - build the frontend and server bundle
- `npm run start` - run the production build
- `npm run preview` - preview the Vite frontend
- `npm run lint` - TypeScript type check
