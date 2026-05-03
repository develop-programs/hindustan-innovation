# Hindustaan Innovations
<p>
  <img src="./public/logo.png" alt="Hindustaan Innovations Logo" width="100" />
</p>
> AI Automation for Modern Businesses Made Simple

A modern, highly interactive portfolio and business website for Hindustaan Innovations, built with Next.js 16 (App Router), React 19, and Tailwind CSS v4. The project showcases services, case studies, and career opportunities using engaging micro-interactions and smooth animations.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components**:
  - [Shadcn UI](https://ui.shadcn.com/)
  - [Base UI (@base-ui/react)](https://base-ui.com/)
- **Animations & Effects**:
  - [Motion](https://motion.dev/) (formerly Framer Motion)
  - [tsParticles](https://particles.js.org/)
  - [tw-animate-css](https://github.com/your-repo)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)

## Features

- **App Router**: Utilizes the modern Next.js file-system based routing mechanism.
- **Dark/Light Mode**: Full theme-switching support powered by `next-themes`.
- **Dynamic Particles & Animations**: Immersive particle backgrounds and scroll animations.
- **Responsive Layout**: First-class mobile support and fluid layouts.
- **Contact Integration**: Mail delivery via `nodemailer` combined with `axios`.
- **Fast Performance**: Leveraging Turbopack for rapid development builds.

## Prerequisites

Make sure you have installed:
- Node.js (v20 or higher recommended)
- npm, yarn, pnpm, or bun

## Getting Started

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd hindustan-innovation
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

   The app will be running at [http://localhost:3000](http://localhost:3000). You can start editing the project by modifying files in the `src/app/` directory.

## Scripts

- `npm run dev`: Starts the Next.js development server with Turbopack.
- `npm run build`: Compiles the application for production deployment.
- `npm run start`: Starts the production server.
- `npm run lint`: Checks for code quality issues using Biome.
- `npm run format`: Formats code automatically using Biome.

## Project Structure

```text
├── src/
│   ├── app/                # Next.js App Router endpoints & pages
│   │   ├── about/          # About page
│   │   ├── api/            # Backend API routes
│   │   ├── blog/           # Blog section with dynamic routes
│   │   ├── career/         # Career section with dynamic routes
│   │   ├── case-studies/   # Case studies directory
│   │   ├── contact/        # Contact us page
│   │   ├── docs/           # Documentation pages
│   │   ├── privacy-policy/ # Privacy policy page
│   │   ├── services/       # Services provided
│   │   ├── support/        # Support and helpdesk
│   │   └── terms/          # Terms and conditions
│   ├── components/         # Reusable React components (UI, layout, etc.)
│   ├── lib/                # Utilities and helper functions
│   └── providers/          # React context providers (e.g., ThemeProvider)
├── public/                 # Static assets (images, icons, etc.)
├── next.config.ts          # Next.js configuration
├── biome.json              # Biome Linter & Formatter configuration
└── package.json            # Project dependencies and scripts
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js. You can also deploy this project to any hosting provider that supports Node.js or Docker.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
