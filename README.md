# AI-Wrapper: Celestial Content Engine

A premium AI-powered content generation app built with Next.js, Tailwind CSS, and Google Gemini with an interactive WebGL background.

## Features
- **Celestial Matrix UI**: Interactive, liquid-motion WebGL shader background that responds to your mouse.
- **Gemini 2.5-Flash**: Powered by the latest ultra-fast reasoning model from Google.
- **Real-time Streaming**: Watch the content appear as it's generated.
- **Smart Rate Limiting**: Limit check *before* generation, decrement *after* success (prevents lost credits on errors).
- **Premium Aesthetics**: Futurist "Blue-to-Emerald" cyan theme with glassmorphism and animations.

## Setup

1. **Environment Variables**:
   Add your keys to `.env`:
   ```bash
   DATABASE_URL="postgresql://..." # Your Neon/Postgres URL
   GEMINI_API_KEY="AIza..."        # Your Google Gemini API Key
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Database Setup**:
   ```bash
   npx prisma db push
   ```

4. **Run the App**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Tech Stack
- **Frontend**: Next.js (App Router), Three.js (WebGL), Tailwind CSS, Framer Motion.
- **Backend**: Edge-ready API Routes, Prisma, PostgreSQL (Neon).
- **AI**: Google Generative AI (Gemini 2.5-Flash).
