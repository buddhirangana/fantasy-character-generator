# ✨ Fantasy Character Generator

A dark-fantasy character generator and deck-builder built with React, Vite, TypeScript, and Express. It creates randomized champions, generates portrait art and origin lore, and stores your favorites in a magical local deck archive.

> Distill ancient bloodlines, elemental affinities, and legendary classes into collectible hero cards.

## 🧙 Overview

This project turns a themed fantasy "alchemist's table" into an interactive generator with:

- random race, class, origin, trait, and affinity selection
- AI-generated portrait art with Gemini when configured
- AI-generated backstory text with graceful procedural fallbacks
- saveable deck cards stored in the browser
- a rich, immersive medieval UI inspired by grimoires and arcane archives

## ✨ Features

- Random fantasy champion generation
- AI portrait creation using Gemini when a valid API key is configured
- AI-powered backstory generation with a procedural fallback if the API is unavailable
- Recent summon history for revisiting previous champions
- Save, inspect, and remove cards from a persistent deck
- Responsive fantasy UI with warm parchment, brass, and ember styling
- Local browser persistence with `localStorage`

## 🛠️ Tech Stack

- React 19
- Vite
- Express
- TypeScript
- Gemini API via Google GenAI SDK
- Lucide icons and Framer Motion for polished UI interactions

## ⚙️ Prerequisites

- Node.js 18+
- npm
- Optional: a Gemini API key for AI portrait and backstory generation

## 🚀 Local Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   copy .env.example .env
   ```

   On macOS or Linux:

   ```bash
   cp .env.example .env
   ```

3. Add your Gemini API key to `.env`:

   ```env
   GEMINI_API_KEY="your_api_key_here"
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

5. Open the app in your browser:

   ```text
   http://localhost:3000
   ```

## 🏗️ Production Build

```bash
npm run build
npm run start
```

This builds the frontend and server bundle, then serves the app from the `dist` directory.

## 🧪 Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run the app in development mode |
| `npm run build` | Create the production build |
| `npm run start` | Start the built app |
| `npm run preview` | Preview the Vite frontend |
| `npm run lint` | Run TypeScript validation |

## 📌 Notes

- The deck persists in browser `localStorage`, so saved champions remain available after refreshes on the same browser.
- The visual design is intentionally themed around alchemy, ancient lore, and arcane craftsmanship.
- The project is fully local and works for experimentation without needing a database backend.
