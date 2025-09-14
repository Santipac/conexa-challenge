# Conexa Challenge - Rick and Morty App

A modern web application built with Next.js that allows exploring characters and episodes from the Rick and Morty universe using the official API.

## 🚀 Features

- **Character Exploration**: Interactive navigation through Rick and Morty characters
- **Episode Information**: Detailed visualization of series episodes
- **Responsive Design**: Adaptive interface for mobile and desktop devices
- **ElevenLabs Audio**: Audio functionality integration
- **Modern Interface**: Designed with Tailwind CSS and Radix UI components
- **Smooth Animations**: Visual effects with Motion (Framer Motion)

## 🛠️ Technologies

- **Framework**: Next.js 15.5.3 with React 19
- **Styling**: Tailwind CSS 4.0 with custom components
- **UI Components**: Radix UI primitives
- **State Management**: Zustand for global state management
- **Animations**: Motion (Framer Motion)
- **Audio**: ElevenLabs React SDK
- **Testing**: Vitest with Testing Library
- **Code Quality**: Biome for linting and formatting
- **TypeScript**: Full support for static typing

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
├── features/              # Domain-organized features
│   ├── characters/        # Characters module
│   │   ├── api/          # API calls
│   │   ├── components/   # Specific components
│   │   ├── hooks/        # Custom hooks
│   │   ├── helpers/      # Utilities and mappers
│   │   └── constants/    # Constants and mock data
│   └── episodes/         # Episodes module
│       ├── api/
│       ├── components/
│       └── helpers/
└── shared/               # Shared resources
    ├── components/       # Reusable components
    ├── hooks/           # Shared hooks
    ├── lib/             # General utilities
    ├── stores/          # Zustand stores
    └── types/           # TypeScript types
```

## 🚦 Installation and Setup

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended) - If you don't have it installed:
  ```bash
  npm install -g pnpm
  ```

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd conexa-ch
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run in development mode**
   ```bash
   pnpm dev
   ```

4. **Open in browser**

   Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `pnpm dev` - Starts the development server with Turbopack
- `pnpm build` - Builds the application for production
- `pnpm start` - Starts the production server
- `pnpm lint` - Runs the linter (Biome)
- `pnpm format` - Formats code automatically
- `pnpm test` - Runs tests with Vitest

## 🧪 Testing

The project uses Vitest as testing framework along with Testing Library for component testing:

```bash
pnpm test          # Run tests
pnpm test --ui     # Run tests with visual interface
```

## 🎨 Development

### Component Architecture

Components are organized following a feature-based architecture pattern:

- **Features**: Each main functionality has its own directory
- **Shared**: Reusable components, hooks, and utilities
- **UI Components**: Design system based on Radix UI

### Code Conventions

- **ESLint + Biome**: For maintaining code consistency
- **TypeScript**: Strict typing throughout the project
- **Component Pattern**: Functional components with hooks
- **Custom Hooks**: Encapsulated reusable logic

## 🌐 API

The application consumes the [Rick and Morty API](https://rickandmortyapi.com/) to fetch information about characters and episodes.

## 📱 Responsive Features

- **Mobile First**: Design optimized for mobile devices
- **Breakpoints**: Smooth adaptation between different screen sizes
- **Touch Interactions**: Navigation optimized for touch devices


