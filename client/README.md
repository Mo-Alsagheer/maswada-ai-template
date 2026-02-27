# Maswada AI - Client (Frontend)

This is the frontend client for Maswada AI, built with React 19, TypeScript, and Vite.

## Tech Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v7
- **Authentication**: Clerk
- **Styling**: Tailwind CSS v4
- **i18n**: react-intl with RTL support

## Setup and Running

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment:
   Copy `.env.example` to `.env` and add your `VITE_CLERK_PUBLISHABLE_KEY`.

3. Start development server:
   ```bash
   npm run dev
   ```

## Project Structure

- `src/app/`: Application core (layouts, pages, routing config)
- `src/components/`: Reusable React components (common, built with UI libraries)
- `src/hooks/`: Custom React hooks (API, language, etc.)
- `src/contexts/`: React context providers (Language/Theme)
- `src/i18n/`: Translations and internationalization configuration
- `src/lib/`: Utilities and helper functions
- `src/types/`: TypeScript definitions

## Features

- Fully responsive Glassmorphism UI
- Dark & Light mode toggle support
- Full support for English and Arabic translations (RTL/LTR)
- JWT Authentication via Clerk
