# Task Management App

This is a Task Management web application built with [Next.js](https://nextjs.org), [Redux](https://redux.js.org/), [redux-persist](https://github.com/rt2zz/redux-persist), and [Material UI](https://mui.com/). It allows users to create, view, and manage tasks with a modern UI and persistent state.

## Features

- Add, view, and manage tasks
- Persistent state using redux-persist (tasks remain after page reload)
- Modern UI with Material UI (MUI)
- Responsive design
- State management with Redux

## Tech Stack

- Next.js (React framework)
- Redux & redux-persist
- Material UI (MUI)

## Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
task_management/
├── public/              # Static assets
├── src/
│   ├── components/      # TaskForm, TaskList
│   ├── pages/           # Next.js pages & API routes
│   ├── store/           # Redux store & slices
│   ├── styles/          # Global styles
│   └── ui/              # MUI theme & custom UI components
└── package.json         # Project dependencies
```

### Key Files

- `src/pages/_app.tsx`: App wrapper with Redux, PersistGate, and MUI ThemeProvider
- `src/store/`: Redux store and tasks slice
- `src/components/`: Task form and list components

## API Routes

Custom API routes are defined in `src/pages/api/` (e.g., `tasks.ts`).

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

## License

MIT

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
