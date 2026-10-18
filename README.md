# E.E. Jornalista Francisco Mesquita

Website of **E.E. Jornalista Francisco Mesquita**, a São Paulo state public school in Parque Císper (Cangaíba), on the East Side of São Paulo, Brazil.

- Website: [jornalista-francisco-mesquita.web.app](https://jornalista-francisco-mesquita.web.app)
- Facebook: [facebook.com/JornalistaFranciscoMesquita](https://www.facebook.com/JornalistaFranciscoMesquita)

## What the site has

- **About the school**: network, shifts, INEP code and patron
- **Grade levels**: Elementary, High School, EJA (Youth and Adult Education) and technical courses
- **Where we are**: address, phone numbers, email and Google Maps
- **Our history**: timeline of the journalist Francisco Mesquita (1893–1969), who gives the school its name
- **Facilities**: library, computer lab, devices for students and more
- **Facebook** page feed
- **9 languages**: pt-BR (default), en-US, es-ES, fr-FR, it-IT, ja-JP, ru-RU, tr-TR, zh-CN. The site follows the browser language and remembers the visitor's choice.
- Responsive layout (phone, tablet, desktop), translucent "glass" design and text contrast that meets WCAG AA

## Stack

| | |
|---|---|
| Framework | [Vue 3](https://vuejs.org) with `<script setup>` |
| Routing | [Vue Router 5](https://router.vuejs.org) (locale in the URL: `/pt-BR/`, `/en-US/`…) |
| Translations | [Vue I18n 11](https://vue-i18n.intlify.dev) (Composition API) |
| Build | [Vite 8](https://vite.dev), [Sass](https://sass-lang.com) |
| Tests | [Vitest 5](https://vitest.dev) + [Vue Test Utils](https://test-utils.vuejs.org), [Playwright](https://playwright.dev) |
| Lint | [ESLint 10](https://eslint.org) flat config + `eslint-plugin-vue` |
| Hosting | [Firebase Hosting](https://firebase.google.com/docs/hosting), deployed by GitHub Actions |

## Getting started

Requires **Node.js 22.22+ or 24.15+** (the version is pinned in [.nvmrc](.nvmrc)). With [nvm](https://github.com/nvm-sh/nvm):

```sh
nvm use
npm install
npm run dev
# http://localhost:2222
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with hot reload on port 2222 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serves the production build locally |
| `npm run test:unit` | Unit tests in watch mode (add `-- --run` to run once) |
| `npm run test:coverage` | Unit tests once with a coverage report (`coverage/index.html`) |
| `npm run test:e2e` | End-to-end tests in Chromium, Firefox and WebKit: languages, content, responsive layout and accessibility (axe-core) |
| `npm run lint` | Lints and fixes what can be fixed automatically |
| `npm run lint:check` | Lints without changing files (used on CI) |

### End-to-end tests

```sh
# First run only: download the browsers
npx playwright install

npm run test:e2e                          # all browsers
npm run test:e2e -- --project=chromium    # only Chromium
npm run test:e2e -- --debug               # step by step
```

Locally the tests use the dev server on port 2222 (an already running `npm run dev` is reused). With `CI=1` they run against `vite preview`, so build first.

## Project structure

```
├── index.html              # HTML shell, SEO meta tags and School structured data (JSON-LD)
├── public/                 # Static files copied as-is (icons, share image, robots.txt)
├── src/
│   ├── main.js             # App bootstrap: i18n + router
│   ├── i18n.js             # Supported locales, browser detection, saved choice, lazy loading
│   ├── router/index.js     # /:locale/ route and locale guard
│   ├── App.vue             # Layout and global design tokens (colors, glass, spacing)
│   ├── components/
│   │   ├── HeaderApp.vue       # Sticky glass header: logo, school name, language select
│   │   ├── TranslateSelect.vue # Language select (shows each language in its own name)
│   │   └── FooterApp.vue       # Glass footer
│   ├── views/HomeView.vue  # All page sections and the school's official data
│   ├── locales/*.json      # Texts in each language
│   └── assets/             # Logo and background image
├── e2e/                    # Playwright tests
└── .github/workflows/      # CI: lint, unit tests, build and deploy
```

## Updating content

- **School data** (address, phones, email, INEP code, patron) is in the `school` object at the top of [src/views/HomeView.vue](src/views/HomeView.vue). If you change the address, phone or email, update the JSON-LD block in [index.html](index.html) too.
- **Texts** are in [src/locales/](src/locales/), one JSON file per language with the same keys. `pt-BR.json` is the reference and the fallback for missing keys. Lists (`levels`, `history.timeline`, `structure.items`) must keep the same number and order of items in every language.
- Don't use `{`, `}`, `@`, `$` or `|` inside texts: Vue I18n treats them as syntax.

To **add a language**, copy `src/locales/pt-BR.json` to `src/locales/<code>.json`, translate the values and add the code to `SUPPORT_LOCALES` in [src/i18n.js](src/i18n.js). The language select shows it in its own name automatically.

The school information was gathered from public sources (INEP School Census, Seduc-SP listings and a 2019 Terra article about Francisco Mesquita). Please confirm changes with the school office.

## Design and accessibility

Colors, the glass effect and spacing are CSS variables on `:root` in [src/App.vue](src/App.vue). Text contrast meets WCAG AA over the photo background; measure again if you make the glass more transparent or the text lighter. The site also respects the *reduce motion*, *reduce transparency* and *increase contrast* system settings.

## Deployment

Pushing to `main` runs [firebase-hosting-merge.yml](.github/workflows/firebase-hosting-merge.yml): install (`npm ci`), lint, unit tests, build and deploy to the live site. Each pull request runs the same checks and publishes a preview channel ([firebase-hosting-pull-request.yml](.github/workflows/firebase-hosting-pull-request.yml)).

The deploy uses the `FIREBASE_SERVICE_ACCOUNT_JORNALISTA_FRANCISCO_MESQUITA` repository secret. All routes are rewritten to `index.html` in [firebase.json](firebase.json), so `/en-US/` and other locale URLs work on refresh.

## Contributing

1. Create a branch from `main`.
2. Make your change and run `npm run lint:check`, `npm run test:unit -- --run` and `npm run build`.
3. Open a pull request: CI runs the same checks and posts a preview link.

Corrections to the school's information are very welcome. Please mention the source (the school office, Seduc-SP, the INEP School Census…).

## License

[MIT](LICENSE) © Lucas Ferreira de Lima
