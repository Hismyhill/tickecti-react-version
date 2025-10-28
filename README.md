# Ticketi — React Implementation

A modern ticket management system built with React, Vite, and Supabase.

## Features

- Secure authentication
- Full ticket CRUD (Create, Read, Update, Delete)
- Responsive, accessible UI
- Real-time updates
- Protected routes
- Tailwind CSS styling

## Tech Stack

- React 18+
- Vite
- Redux Toolkit
- Tailwind CSS
- React Hook Form
- Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account

### Installation

```bash
git clone <repository-url>
cd react-ticket
npm install
```

Create a `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Start the development server:

```bash
npm run dev
```

## Project Structure

```
src/
  app/         # Redux store
  components/  # UI components
  features/    # Auth & tickets logic
  pages/       # Route views
  utils/       # Helpers
```

## Environment Variables

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## License

MIT
