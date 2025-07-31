# MyFavoriteAnimals

An Nx-managed Angular monorepo focused on modularity, testing, and localization.

## Key Technologies

- **Nx**: Monorepo management, code generation, and task orchestration
- **NGXS + Plugins**: State management
- **Valibot**: DTO parsing and validation
- **@angular/localize**: Localization with separate build outputs for `de` (default) and `en-US`
- **@angular/material**: Material Design Components

## Project Structure

- `apps/app`: Main Angular application
- `apps/app-e2e`: End-to-end tests (Playwright)
- `libs/features/animals`: Animals feature libraries (UI, data, widgets)
- `libs/features/dashboard`: Dashboard feature library (UI, data, widgets)
- `libs/common/ui`: Shared UI components

## Feature Libraries Structure

- `libs/features/animals/animals-data`: rule of thumb -> everything `@Injectable({ providedIn: 'root' })`
  - store (state, actions, queries, model)
  - domain models
  - services (e.g. data fetching, navigation)
- `libs/features/animals/animals-ui`: feature ui (pages, components, routes)
- `libs/features/animals/animals-widgets`: embeddable ui to be consumed by other features
  - encapsulates data access, other features do not have to know how and where the data comes from

### Decision drivers:

Allows for fine grained chunk generation in combination with lazy loading (dynamic imports). app lazy loads dashboard and animals. dashboard only uses widgets coming from the widgets package. only when navigating to animals, either from dashboard or directly visiting the page, the animals page + components are getting loaded.

`animals-data` package is used inside the `animals-widgets` and `animals-ui` package which makes it a common dependency across those packages which allows the bundler making it a separate chunk.

## State Management - Decision Drivers

Use of NGXS (any other redux like library e.g. ngrx would also be fine) was intended. Currently not used inside this project but the use of platforms like Sentry allows for fine grained debugging and early error discovery due to all the actions dispached being recorded. Combined with redux timeline feature allows for even more easier replication of app misbehaviour.

## Nx - Desicion Drivers

- Module Boundary Rules (applied in this project) - ESLint rule that enforces import restrictions based on tags and project relationships.
- Project Graph - Nx's representation of your workspace showing projects and their dependencies.
- Tags - Project tags are used to categorize and group projects, which then work with the module boundary rules to control imports.
- No monolithic `angular.json` file but package locale `project.json` files.

To see Module Boundary Rules in action import `AnimalsState` and add it to the `providers: [AnimalsState],` in `DashboardPage`. Linter should complain about `AnimalsState` import violating a module boundary.

## Valibot - Desicion Drivers

Validating/Parsing actual incoming DTOs as Typescript types are stripped away during compilation and have no effect on the resulting js output. Without DTO parsing any object structure could be injected into the app and it would still assume it is working with the intended structure.
Valibot also strips away properties that are not defined by the schema, leaving only those that were specified.

## Localisation - Desicion Drivers

Using angular localize package with compile time instead of runtime localisation. Coming form the question "how often do you change the language of the app you are frequently using". My personal answer to this question is almost never once done thus compile time localisation resulting in a reroute/page reload on language change.

Another runtime localisation solution could be imeplemented through [Transloco](https://github.com/jsverse/transloco)

## Project Setup

```sh
npm i

# e2e dependencies
npx playwright install
```

## Core Commands

### Serving the App

```sh
# (default development, de)
npx nx run app:serve
# or default (de)
npx nx run app:serve:development
# or (default development)
npx nx run app:serve:de

# English (en-US)
npx nx run app:serve:development --configuration=en-US
# or (default development)
npx nx run app:serve:en-US
```

### Building the App

```sh
# Defaults to production, generates de + en-US outputs
npx nx run app:build
# or production explicit, generates de + en-US outputs
npx nx run app:build:production

# development, generates de + en-US outputs
npx nx run app:build:development
```

Build produces a `stats.json` (`dist/apps/app/stats.json`) that can be analyzed through [Bundle Size Analyzer](https://esbuild.github.io/analyze/)

Serving both localised versions, accessible through

```sh
cd ./dist/apps/app/browser
npx serve -c ../../../../serve.json
```

### Unit Testing

```sh
npx nx run <project-name>:test --watch --ui --coverage

# run all tests in all packages
npx nx run-many --target=test --all --parallel --coverage
```

`<project-name>` is the `name` property inside `project.json` of each package.

### E2E Testing

```sh
npx nx run app-e2e:e2e

# UI with timeline, logs, tests cases, etc.
npx nx run app-e2e:e2e --ui
```

### Internationalization

```sh
npx nx extract-i18n app
```

Updates `apps/app/src/locale/messages.xlf`, manual adjustments/translations must be done for `messages.en-US.xlf`

### Project Graph

```sh
npx nx graph app
```

Visualize dependencies, lazy loading, and package relationships.

## What’s Missing / TODO

- Integrate HttpClient for real API calls
- Setting current locale as header in request to get localised animal description
- Pass base URL via injection tokens for environment-specific configuration
- Expand E2E tests to cover real HTTP scenarios when backend is available

## Useful Links

- [Nx Documentation](https://nx.dev)
- [NGXS Documentation](https://www.ngxs.io/)
- [Valibot Documentation](https://valibot.dev/)
- [Angular Localization](https://angular.dev/guide/i18n)
