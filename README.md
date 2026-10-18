# Web site of school E.E.Jornalista Francisco Mesquita
> [jornalista-francisco-mesquita.web.app](https://jornalista-francisco-mesquita.web.app)

> [Facebook Page](https://www.facebook.com/JornalistaFranciscoMesquita)

## Project Setup

Requires Node.js 22.22+ (or 24.15+). With [nvm](https://github.com/nvm-sh/nvm):

```sh
nvm use
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
# http://localhost:2222
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Playwright](https://playwright.dev)

```sh
# Install browsers for the first run
npx playwright install

# When testing on CI, must build the project first
npm run build

# Runs the end-to-end tests
npm run test:e2e
# Runs the tests only on Chromium
npm run test:e2e -- --project=chromium
# Runs the tests of a specific file
npm run test:e2e -- e2e/vue.spec.js
# Runs the tests in debug mode
npm run test:e2e -- --debug
```

### Lint with [ESLint](https://eslint.org/)

```sh
# Fix what can be fixed automatically
npm run lint
# Check only (used on CI)
npm run lint:check
```
