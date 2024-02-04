# Job Orientation planner
This *Job Orientation Planner* is a tool developed as part of the SUD lessons for the assignment of event dates for students.

---

In order to fulfill all requirements for this project, instructions for setting up and executing the code are linked below, as well as user documentation.

## Documentation

https://docs.google.com/document/d/1Rmm5mffy3_ZfKL1YVxMG4sQmB97_lMQpyFaBDqBQbQM/edit?usp=sharing

## Instructions for code setup and execution

This example shows how to use Next.js inside an Electron application. To avoid a lot of configuration, we use Next.js as a router for pages, and use server rendering to speed up the initial render of the application. Both Next.js and Electron layers are written in TypeScript and compiled to JavaScript during the build process.

| Part       | Source code (Typescript) | Builds (JavaScript) |
| ---------- | ------------------------ | ------------------- |
| Next.js    | `/renderer`              | `/renderer`         |
| Electron   | `/electron-src`          | `/main`             |
| Production |                          | `/dist`             |

For development it's going to run a HTTP server and let Next.js handle routing. In production it will use `output: 'export'` to pre-generate HTML static files and use them in your app (instead of running a HTTP server).

### How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init), [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/), or [pnpm](https://pnpm.io) to bootstrap the example:

```bash
npx create-next-app --example with-electron-typescript with-electron-typescript-app
```

```bash
yarn create next-app --example with-electron-typescript with-electron-typescript-app
```

```bash
pnpm create next-app --example with-electron-typescript with-electron-typescript-app
```

Available commands:

```bash
"build-renderer": build and transpile Next.js layer
"build-electron": transpile electron layer
"build": build both layers
"dev": start dev version
"dist": create production electron build
"type-check": check TypeScript in project
```

### Notes

You can create the production app using `npm run dist`.

_note regarding types:_

- Electron provides its own type definitions, so you don't need @types/electron installed!
  source: https://www.npmjs.com/package/@types/electron
- There were no types available for `electron-next` at the time of creating this example, so until they are available there is a file `electron-next.d.ts` in `electron-src` directory.
