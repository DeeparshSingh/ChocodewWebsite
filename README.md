# Chocodew - Premium Beverage Vending Solutions

A premium website for Chocodew, an Indian beverage-vending brand by Marine International, Ludhiana.

## Technologies Used

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Framer Motion for animations
- React Hook Form for form management
- Zod for schema validation
- Lucide React for icons

## Features

- Responsive design for all device sizes
- Modern UI with smooth animations
- Product showcase with detailed product pages
- Premix calculator functionality
- Company timeline and about information
- Contact form with validation

## Getting Started

### Prerequisites

- Node.js
- pnpm (recommended) or npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Running the Development Server

```bash
pnpm dev
```

### Linting and Formatting

To lint the codebase:
```bash
pnpm lint
```

To format the codebase:
```bash
pnpm format
```

The development server will start, and you can view the website at [http://localhost:3000](http://localhost:3000).

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - React components organized by feature. Contains a `/ui` subdirectory for shadcn/ui components.
- `/data` - Sample data for products, testimonials, etc.
- `/types` - TypeScript type definitions
- `/lib` - Utility functions and shared logic

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_PHONE_NUMBER="+91 1234567890"
NEXT_PUBLIC_WHATSAPP_NUMBER="911234567890"
NEXT_PUBLIC_EMAIL="info@chocodew.com"
NEXT_PUBLIC_ADDRESS="Marine International, Ludhiana, Punjab, India"
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Building and Running for Production

To build the application for production:
```bash
pnpm build
```

After a successful build, you can start the production server with:
```bash
pnpm start
```

This will serve the optimized production build, typically on port 3000 (or as configured).