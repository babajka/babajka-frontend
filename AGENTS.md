# AGENTS.md - Developer Guide for babajka-frontend

## Overview

This is a Next.js (v10) + React (v16) application with Express server-side rendering. The project uses SCSS with BEM CSS modules for styling.

## Build Commands

### Development

```bash
npm run dev          # Start development server on port 3000
make local-backend  # Start with local backend (http://localhost:8080)
```

### Production Build

```bash
make build                    # Build for production (requires BACKEND_URL env var)
BACKEND_URL=https://api-prod.wir.by make build
npm run start:prod           # Build and start production server
```

### Linting & Formatting

```bash
npm run lint        # Run full lint: prettier + eslint + stylelint
make lint           # Same as above
npm run prettify    # Run prettier only
npm run stylelint   # Run stylelint only
```

### Other Commands

```bash
npm run analyze     # Build with bundle analyzer
npm run size        # Check bundle size
npm run fetch-data  # Update dictionary and team data from Google Sheets
```

### CI/CD

```bash
npm run deploy-dev-from-local   # Deploy to dev environment
npm run deploy-prod-from-local  # Deploy to production
```

**Note:** This project has NO test suite. Do not write tests.

## Code Style Guidelines

### General

- Use JavaScript (ES6+), not TypeScript
- Use `.js` extension for all files
- Use `babel-module-resolver` for path aliases (e.g., `components/`, `utils/`)
- Base URL is project root (`./`)

### Formatting (Prettier)

- Print width: 100 characters
- Single quotes for strings
- Trailing commas: ES5 style
- Arrow function parens: avoid when possible

Run `npm run prettify` to auto-format.

### ESLint Configuration

- Based on Airbnb config + Prettier
- React hooks rules enforced (`react-hooks/rules-of-hooks`, `react-hooks/exhaustive-deps`)
- PropTypes required (disabled in ESLint but preferred in code)
- Console allowed: `warn` and `error` only
- Allowed underscore: `_id` (backend API), `_` (unused variables placeholder)

### Styling (SCSS + BEM)

- Use BEM CSS modules with `bem-css-modules` library
- 2-space indentation
- Single quotes for strings
- No `!important` allowed
- Max nesting depth: 3
- No `extend` at-rules
- Use shorthand properties
- Colors: lowercase hex, long format (`#ffffff` not `#fff`)

### React Components

- Use functional components with arrow functions
- PascalCase for component names
- Use PropTypes for prop validation
- Prefer named exports for utilities, default for components

Example component structure:

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import bem from 'bem-css-modules';

import Icon from 'components/common/ui/Icon';
import styles from './button.module.scss';

const b = bem(styles);

const Button = ({ className, children, ...props }) => (
  <button className={cn(b(), className)} {...props}>
    {children}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  className: '',
};

export default Button;
```

### Naming Conventions

- Components: `PascalCase` (e.g., `Button.js`, `Header.js`)
- Hooks: `camelCase` starting with `use` (e.g., `useToggleSidebar.js`)
- Utils: `camelCase` (e.g., `formatDate.js`)
- Styles: `kebab-case.module.scss` (e.g., `button.module.scss`)
- Constants: `SCREAMING_SNAKE_CASE` (e.g., `API_URL`)

### Import Order

1. External libraries (`react`, `prop-types`)
2. Internal modules (path aliases like `components/`, `utils/`)
3. Relative imports (local components)
4. Styles

### Error Handling

- Use `console.warn` and `console.error` for logging (no `console.log`)
- Use error boundaries for component errors
- Handle API errors gracefully with user feedback

### Next.js Specific

- Use `next/router` for routing
- Place pages in `pages/` directory
- Use `getStaticProps`, `getStaticPaths`, or `getServerSideProps` for data fetching
- Use `Link` component from `next/link` for internal navigation

### File Organization

```
components/
  common/          # Reusable components
    ui/            # Basic UI elements (Button, Input, Icon)
  layout/          # Layout components (Header, Footer, Sidebar)
  social/          # Social sharing, meta tags
features/          # Feature-specific components
constants/         # App constants
hooks/             # Custom React hooks
lib/               # Third-party library wrappers
pages/             # Next.js pages
styles/            # Global styles
utils/             # Utility functions
```

### Git & Workflow

- Uses semantic-release for versioning
- Pre-commit hooks via husky + lint-staged
- Conventional commits recommended but not enforced
