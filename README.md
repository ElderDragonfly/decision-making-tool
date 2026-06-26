# Decision Making Tool

TypeScript decision-making application with weighted random selection, canvas wheel animation, localStorage persistence, and file import/export.

## Live Demo

[Open Decision Making Tool](https://elderdragonfly.github.io/decision-making-tool/)

## Overview

Decision Making Tool is a frontend training project built with TypeScript without frontend frameworks.

The app helps users make a random choice from a custom list of options. Each option can have its own weight, which affects the chance of being selected. The result is displayed using an animated canvas wheel.

The project focuses on frontend logic, DOM rendering, canvas animation, state management, and browser APIs.

## Features

* Add, edit, and remove decision options
* Set custom weight for each option
* Random weighted selection
* Animated spinning wheel using Canvas
* Save options in localStorage
* Restore saved data after page reload
* Export options to a file
* Import options from a file
* Modal windows for user interactions
* Hash-based routing
* Responsive interface
* Sound effect for the final result

## Tech Stack

* TypeScript
* Webpack
* Sass
* HTML
* Canvas API
* DOM API
* localStorage
* File API
* ESLint
* Prettier

## Project Structure

```text
decision-making-tool/
  public/              # static public files
  src/                 # application source code
  src/assets/          # images, fonts, audio
  src/components/      # UI components
  src/styles/          # Sass styles
  docs/                # production build for GitHub Pages
  package.json         # scripts and dependencies
  webpack.config.mjs   # Webpack configuration
  tsconfig.json        # TypeScript configuration
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ElderDragonfly/decision-making-tool.git
cd decision-making-tool
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project in development mode

```bash
npm run dev
```

The app will be available at:

```text
http://localhost:8080
```

### 4. Build the project

```bash
npm run build
```

### 5. Run lint

```bash
npm run lint
```

## Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the project for production.

```bash
npm run lint
```

Runs ESLint checks.

## Deployment

The project is deployed with GitHub Pages.

Production files are generated with:

```bash
npm run build
```

The generated `dist` files are copied to the `docs` folder, which is used as the GitHub Pages publishing source.

Live demo:

```text
https://elderdragonfly.github.io/decision-making-tool/
```

## Notes

This project was created as part of frontend training.

The main focus of the project is frontend logic: TypeScript architecture, DOM rendering, canvas animation, weighted random selection, localStorage persistence, and file import/export without frontend frameworks.
