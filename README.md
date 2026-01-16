# Content Marketing Generator

A premium AI-powered content generation app built with Next.js 14, Tailwind CSS, and Google Gemini.

## Features
- **AI Generation**: Create Tweets, Blogs, and Slogans.
- **Real-time Streaming**: Watch the content appear as it's generated.
- **Rate Limiting**: Free users are limited to 3 generations per day (tracked by IP).
- **Premium UI**: Aeon/Futuristic design with glassmorphism and animations.

## Setup

1. **Environment Variables**:
   Rename `.env.example` to `.env` and add your keys:
   ```bash
   DATABASE_URL="postgresql://..." # Your Neon/Postgres URL
   GEMINI_API_KEY="AIza..."        # Your Google Gemini API Key
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   *Note: This will also generate the Prisma client.*

3. **Database Setup**:
   Push the schema to your database:
   ```bash
   npx prisma db push
   ```

4. **Run the App**:
   ```bash
   npm run dev
   ```

## Tech Stack
- Frontend: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Lucide React.
- Backend: Next.js API Routes, Prisma, PostgreSQL.
- AI: Google Generative AI SDK (Gemini).
