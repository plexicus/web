# Plexicus Website

This repository contains the source code for the Plexicus website - an AI-powered cybersecurity platform specializing in vulnerability remediation.

## About Plexicus

Plexicus is designed to be your cybersecurity AI Agent, offering continuous support, guidance, and automated solutions. The platform helps organizations elevate their cybersecurity strategy through AI-powered vulnerability remediation.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the web application
- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible UI components

## Prerequisites

Before running this project, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- [pnpm](https://pnpm.io/) (Package manager)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/plexicus/web.git
   cd web
   ```

2. Install the dependencies:
   ```bash
   pnpm install
   ```

## Running the Development Server

To start the development server:

```bash
pnpm dev
```

This will start the Next.js development server at [http://localhost:3000](http://localhost:3000).

## Building for Production

To build the application for production:

```bash
pnpm build
```

## Starting Production Server

To start the production server after building:

```bash
pnpm start
```

## Linting

To run the linter:

```bash
pnpm lint
```

## Project Structure

- `/app` - Next.js app directory containing app router components
- `/components` - Reusable React components
- `/lib` - Utility functions and configuration
- `/public` - Static assets like images and fonts
- `/src` - Source code directory
  - `/components` - Main UI components
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions
  - `/styles` - CSS styles

## Additional Resources

- Visit [plexicus.com](https://plexicus.com) for more information about Plexicus
- Contact: info@plexicus.com

## License

Copyright © 2025 PLEXICUS, LLC. All rights reserved. 