## React Practices (Monorepo)

A personal playground for sharpening React skills by building small, focused apps. Expect lots of hooks, TypeScript, and the occasional confetti. Learning should feel fun—like lifting weights, but for your brain.

### What’s inside

- **Workspaces**: Managed with npm workspaces (`apps/*`, `packages/*`)
- **Apps**:
  - `tenzies`: A React + TypeScript dice game. See `apps/tenzies/README.md` for gameplay and details

### Tech stack

- **React 19** + **TypeScript**
- **Vite 7** for dev/build
- **ESLint** for code quality
- **npm workspaces** for monorepo management

### Prerequisites

- Node.js 18+ (recommended)
- npm 9+

### Getting started

1) Install dependencies (root will install all workspaces):

```bash
npm install
```

2) Run an app (example: Tenzies):

```bash
npm run dev:tenzies
```

3) Build all apps/packages:

```bash
npm run build
```

4) Preview production builds:

```bash
npm run preview
```

5) Lint all workspaces:

```bash
npm run lint
```

### Project structure

```text
react-practices/
├─ apps/
│  └─ tenzies/            # React + TS dice game
├─ packages/              # Shared libraries (future)
├─ package.json           # Workspaces + root scripts
└─ README.md
```

### Add a new app

Create a new React + TS app under `apps/` and it will automatically be picked up by workspaces.

```bash
cd apps
npm create vite@latest my-new-app -- --template react-ts
cd my-new-app
npm install
```

Run it with:

```bash
npm run -w my-new-app dev
```

Tip: Keep app `package.json` private and align tooling with the rest of the repo.

### Learning goals

- Practice modern React patterns (hooks, composition, state management)
- Strengthen TypeScript fluency in UI code
- Experiment with small, shippable ideas (quick build-measure-learn)

If it helps you think better and build faster, it belongs here. Have fun—and don’t forget to ship confetti when you win.


