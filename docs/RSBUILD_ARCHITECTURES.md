# Rsbuild Architecture Guide

This guide explains the project structure and architecture for projects using **Rsbuild** as the bundler.

## What is Rsbuild?

**Rsbuild** is a Rust-based build tool powered by **Rspack**. It provides:

- ⚡ **5-10x faster build speed** compared to Webpack
- 🚀 **Zero-config**: Works out-of-the-box with sensible defaults
- 🔄 **Consistency**: Same build output in dev and production
- 📦 **Smart chunking**: Automatic code splitting and optimization
- ✅ **Webpack compatible**: Supports Webpack plugins

## Project Structure

```
my-app/
├── public/                 # Static assets
│   └── .gitkeep
├── src/
│   ├── api/               # API endpoint definitions
│   ├── assets/            # Images, icons, fonts, etc.
│   ├── components/        # Reusable React components
│   ├── config/            # Application configuration
│   │   └── config.json
│   ├── constants/         # Constants (tokens, API keys, etc.)
│   │   └── token.constants.ts
│   ├── hooks/             # Custom React hooks
│   ├── libs/              # Libraries and utilities
│   │   ├── axios/         # Axios configuration
│   │   └── token/         # Token management
│   ├── pages/             # Page components
│   ├── queries/           # API queries (React Query, etc.)
│   ├── styles/            # Global styles and CSS
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Root component
│   ├── App.css            # Root styles
│   └── main.tsx           # Application entry point
├── index.html             # HTML template
├── rsbuild.config.ts      # Rsbuild configuration
├── tsconfig.json          # TypeScript root config
├── tsconfig.app.json      # TypeScript app config
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `UserProfile.tsx` |
| Files | camelCase | `userService.ts` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Hooks | camelCase with `use` prefix | `useAuth.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase or Generic | `User.ts`, `ApiResponse.ts` |

## Building and Running

### Development

```bash
npm run dev
```

The dev server starts at `http://localhost:3000` (or next available port) with HMR enabled.

### Production Build

```bash
npm run build
```

Creates an optimized production build in the `build/` directory.

### Preview Production Build

```bash
npm run preview
```

Locally preview the production build.

### Linting

```bash
npm run lint
```

Run ESLint to check code quality.

## Rsbuild Configuration

The `rsbuild.config.ts` file controls the build process:

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: { index: './src/main.tsx' },
    alias: { '@src': './src' },
  },
  output: {
    target: 'web',
    distPath: { root: 'build' },
  },
});
```

### Key Configuration Options

- **plugins**: Rsbuild plugins (React plugin is pre-configured)
- **source.entry**: Entry point of the application
- **source.alias**: Path aliases for cleaner imports
- **output.distPath**: Output directory for builds
- **performance.chunkSplit**: Code splitting strategy

## Path Aliases

Pre-configured path aliases for cleaner imports:

```typescript
// Instead of this:
import Component from '../../../components/MyComponent';

// Use this:
import Component from '@components/MyComponent';
```

**Available aliases:**
- `@src` → `src/`
- `@components` → `src/components/`
- `@hooks` → `src/hooks/`
- `@utils` → `src/utils/`
- `@types` → `src/types/`
- `@assets` → `src/assets/`
- `@config` → `src/config/`
- `@constants` → `src/constants/`
- `@libs` → `src/libs/`
- `@pages` → `src/pages/`
- `@queries` → `src/queries/`
- `@api` → `src/api/`
- `@styles` → `src/styles/`

## Development Workflow

### 1. Creating Components

```typescript
// src/components/UserCard.tsx
import React from 'react';
import styles from './UserCard.module.css';

interface UserCardProps {
  name: string;
  email: string;
}

export const UserCard: React.FC<UserCardProps> = ({ name, email }) => {
  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p>{email}</p>
    </div>
  );
};
```

### 2. Using Custom Hooks

```typescript
// src/hooks/useUser.ts
import { useState, useEffect } from 'react';
import { customAxios } from '@libs/axios/customAxios';

export const useUser = (userId: string) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    customAxios.get(`/api/users/${userId}`).then(res => {
      setUser(res.data);
      setLoading(false);
    });
  }, [userId]);

  return { user, loading };
};
```

### 3. API Integration

```typescript
// src/api/userService.ts
import { customAxios } from '@libs/axios/customAxios';

export const fetchUsers = () => {
  return customAxios.get('/api/users');
};

export const fetchUser = (id: string) => {
  return customAxios.get(`/api/users/${id}`);
};

export const createUser = (userData: any) => {
  return customAxios.post('/api/users', userData);
};
```

### 4. Using in Components

```typescript
// src/pages/UserList.tsx
import { useEffect, useState } from 'react';
import { fetchUsers } from '@api/userService';
import { UserCard } from '@components/UserCard';

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers().then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map(user => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
};
```

## Performance Optimization

### Code Splitting

Rsbuild automatically handles code splitting:

```typescript
// Automatic chunking of node_modules
import lodash from 'lodash'; // → vendor chunk

// Automatic page-based splitting
import UserList from '@pages/UserList'; // → separate chunk
```

### Lazy Loading Components

```typescript
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('@components/Heavy'));

export const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <HeavyComponent />
  </Suspense>
);
```

### Image Optimization

```typescript
// Automatic optimization
import logo from '@assets/logo.png';

export const Header = () => (
  <img src={logo} alt="Logo" />
);
```

## Dependency Management

### Adding Dependencies

```bash
npm install package-name
# or
yarn add package-name
# or
pnpm add package-name
```

### Key Dependencies (Pre-installed)

- **react**: React library
- **react-dom**: React DOM rendering
- **axios**: HTTP client (if Axios template selected)
- **typescript**: Type checking
- **eslint**: Code linting

## Type Checking

TypeScript is configured with strict mode enabled:

```bash
# Check types (no compilation)
npx tsc --noEmit
```

Configuration in `tsconfig.app.json`:
- `strict: true` - Strict type checking
- `noUnusedLocals: true` - Warn unused variables
- `noUnusedParameters: true` - Warn unused parameters

## Debugging

### In Browser DevTools

1. Open DevTools (F12)
2. Go to Sources tab
3. Navigate to webpack:// > ./ > src/
4. Set breakpoints and debug

### ESLint

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint -- --fix
```

## Common Tasks

### Adding Global Styles

```typescript
// src/styles/global.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto';
}
```

```typescript
// src/main.tsx
import '@styles/global.css';
```

### Environment Variables

Create `.env` file:

```
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=1.0.0
```

Access in code:

```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Performance Comparison

| Metric | Rsbuild | Webpack | Vite |
|--------|---------|---------|------|
| Cold Start | ~30s | ~85s | ~1s |
| HMR | 3-4s | 9-10s | <1s |
| Build | 5-10x faster | Baseline | Fast |
| Dev/Prod Consistency | ✅ Same | ⚠️ Different | ⚠️ Different |

## Migration from Other Bundlers

### From Webpack

- Webpack config is no longer needed (Rsbuild is zero-config)
- Path aliases are automatically detected from `tsconfig.json`
- Most Webpack plugins work via `@rsbuild/core`

### From Vite

- Same dev server experience but more optimized for production
- Built-in React Fast Refresh (same as Vite)
- Better build optimization and chunking strategy

## Resources

- 📚 [Official Rsbuild Documentation](https://rsbuild.rs/)
- 🔗 [Rspack Documentation](https://rspack.dev/)
- 💬 [Rsbuild GitHub Discussions](https://github.com/web-infra-dev/rsbuild/discussions)
- 🐛 [Report Issues](https://github.com/web-infra-dev/rsbuild/issues)

## Troubleshooting

### Common Issues

**Issue**: Port 3000 already in use
```bash
# Use a different port
npm run dev -- --port 3001
```

**Issue**: Types not recognized
```bash
# Rebuild type definitions
npm run build
```

**Issue**: Changes not reflecting
```bash
# Clear Rsbuild cache
rm -rf dist && npm run dev
```

## Best Practices

1. **Use TypeScript**: Take advantage of strict type checking
2. **Path Aliases**: Keep imports clean and readable
3. **Component Composition**: Break UI into small, reusable components
4. **Lazy Loading**: Use React.lazy() for heavy components
5. **Error Boundaries**: Wrap components to catch errors
6. **Memoization**: Use React.memo() for expensive computations
7. **Code Splitting**: Let Rsbuild handle automatic chunking
