# Companies Directory Frontend

A production-ready React application for browsing and filtering companies, built with modern best practices.

## Features

- **Responsive Design**: Table view for desktop, Card view for mobile.
- **Advanced Filtering**: Filter by Industry, Location, and Search by Name (debounced).
- **Sorting**: Sort by Name or Founded Year.
- **Client-side Pagination**: Dynamic page size and navigation.
- **URL Synchronization**: Shareable URLs with filter state preserved.
- **Mock API**: Simulated async data fetching with realistic delay.

## Tech Stack

- **React 18** (Functional Components, Hooks)
- **TypeScript** (Strict Mode, Type Safety)
- **Vite** (Fast Build Tool)
- **Tailwind CSS** (Utility-first Styling)
- **Lucide React** (Icons)

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable primitives (Button, Input, Badge...)
│   ├── features/     # Domain components (CompanyTable, FilterBar...)
│   └── layout/       # App shell (Header, MainLayout)
├── hooks/            # Custom logic (useCompanies, useUrlSync...)
├── services/         # API abstraction (mocked)
├── types/            # TS Interfaces
└── utils/            # Helpers (cn)
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Development Decisions

- **URL Sync**: Implemented `useUrlSync` hook to treat the URL as a source of truth for filters, improving UX.
- **Accessibility**: Used semantic HTML (`table`, `select`, `button`) and managing focus states.
- **Performance**: Debounced search input to prevent excessive processing/re-renders.
