# Bolt Car Rental – Frontend

This is the frontend application for the **Bolt Car Rental** system. It is built using [Vite](https://vitejs.dev/), [React](https://react.dev/), and modern UI libraries. It communicates with a NestJS + MongoDB backend to show car availability and manage bookings.

---

## Getting Started

### 1. Install dependencies

```sh
yarn install
```

### 2. Copy environment variables

```sh
cp .env.example .env.local
```

Edit `.env` with your own values as needed.

### 3. Run the development server

```sh
yarn run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```sh
yarn run build
yarn run preview
```

---

## Scripts

- `yarn run dev` – Start the development server
- `yarn run build` – Build for production
- `yarn run preview` – Preview the production build locally
- `yarn run lint` – Lint the codebase

---

## Technologies Used

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (including calendar)
- [TanStack React Query](https://tanstack.com/query)
- [Zod](https://zod.dev/)
- [Sonner](https://sonner.emilkowal.dev/)
