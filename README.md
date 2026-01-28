## b1nd-react-app

# Overview

b1nd-react-app is a modern React boilerplate template powered by **Rsbuild** (default) or **Vite** for rapid development. It includes pre-configured authentication setup with Axios interceptors for seamless API communication. The project structure is extensible and optimized for both development and production environments.

### Key Features

⚡ **Rsbuild**: 5-10x faster build speed than Webpack (zero-config, zero setup)
🚀 **Vite Alternative**: Sub-second HMR for alternative bundler choice
🔐 **Auth Ready**: Built-in token management and axios interceptors
📦 **Production Ready**: Optimized for both development and production builds
🎯 **CLI**: Interactive setup with TypeScript/JavaScript and npm/yarn/pnpm/bun support

## How to Use

### Quick Start

Create a new project with a single command:

```bash
npx b1nd-react-app my-app
```

Or use the current directory:

```bash
npx b1nd-react-app .
```

### Interactive Setup

The CLI will guide you through these selections:

1. **Bundler Selection** (Choose your build tool):
   ```
   ❯ Rsbuild (Recommended, Fastest) ⚡
     Vite
   ```

2. **Language Selection** (Choose your language):
   ```
   ❯ TypeScript
     JavaScript
   ```

3. **Package Manager Selection** (Choose your package manager):
   ```
   ❯ npm
     yarn
     pnpm
     bun
   ```

4. **Axios Integration** (Include API client):
   ```
   ❯ Yes (Recommended)
     No
   ```

### Command-Line Options

You can also use CLI flags to skip the prompts:

```bash
# Use Rsbuild with TypeScript
npx b1nd-react-app my-app --bundler rsbuild --language ts

# Use Vite with JavaScript
npx b1nd-react-app my-app --bundler vite --language js

# Skip dependency installation
npx b1nd-react-app my-app --skip-install
```


### Getting Started After Project Creation

After creating your project, navigate to the directory and start development:

```bash
cd my-app

# Start development server
npm run dev      # or yarn dev, pnpm dev, bun dev

# Build for production
npm run build    # or yarn build, pnpm build, bun build

# Preview production build locally
npm run preview  # or yarn preview, pnpm preview, bun preview

# Run linting
npm run lint     # or yarn lint, pnpm lint, bun lint
```

### Installation Speed Comparison

| Bundler | Install Time | Build Time | HMR |
|---------|-------------|-----------|-----|
| Rsbuild | ~30-60s | 5-10x faster | 3-4s |
| Vite | ~30-60s | Fast | <1s |
| Webpack | ~2-3 min | Baseline | 9-10s |
| CRA (Deprecated) | ~2-3 min | Slow | 10s+ |




### Configuration (For Axios Templates)

If you selected **Axios** during setup, you'll need to configure the following:

1. **API Base URL** (`src/config/config.json`):
   ```json
   {
     "server": "https://your-api-baseurl.com"
   }
   ```

2. **Token Refresh Endpoint** (`src/libs/axios/responseInterceptor.ts`):
   - Update the `/refresh` endpoint to match your API's token refresh route
   - Modify the request body structure to match your API's requirements

3. **Login URL** (`src/libs/axios/requestInterceptor.ts`):
   - Change the default `/login` path to your application's login route
   - This path is used when tokens are invalid

4. **Token Storage** (`src/libs/token/token.ts`):
   - By default, tokens are stored in browser cookies
   - You can modify this to use localStorage, sessionStorage, or other methods

## Notes

### Token Management (Axios Templates)

- **Token Storage**: By default, tokens are stored in browser cookies
- **Token Types**: `accessToken` (short-lived) and `refreshToken` (long-lived)
- **Setting Tokens**: Use `Token.setToken(key, value)` after authentication
  ```typescript
  import Token from '@libs/token/token';
  import { ACCESS_TOKEN_KEY } from '@constants/token.constants';

  // After login
  Token.setToken(ACCESS_TOKEN_KEY, response.data.accessToken);
  ```
- **Automatic Refresh**: Axios interceptors automatically handle token refresh on 401 errors

### Architecture Patterns

- This boilerplate follows a **component-based architecture** optimized for React
- Designed to work well with modern state management solutions (React Context, Zustand, Redux)
- Works seamlessly with **React Query** for server state management
- Path aliases (@components, @hooks, etc.) are pre-configured for cleaner imports

### Optional Customizations

- **Remove Axios**: If you don't need Axios, delete `src/libs/` and `src/config/` directories
- **Token Storage**: Replace cookie storage in `src/libs/token/token.ts` with localStorage or sessionStorage
- **Styling**: Add CSS-in-JS libraries (styled-components, emotion) as needed



## Folder Architecture
```
├─public
└─src
    ├─api               # API related files
    ├─assets            # Static files such as images, fonts, etc.
    ├─components        # UI components
    ├─config            # Configuration files (config.json)
    ├─constants         # Constant files
    │   └─token         # Token-related constants
    │      └─token.constants.ts
    ├─hooks             # Custom hooks
    ├─libs              # Libraries and helper functions
    │   └─axios         # Axios-related settings
    │      ├─customAxios.ts
    │      ├─requestInterceptor.ts
    │      └─responseInterceptor.ts
    │   └─token         # Token-related settings
    │      └─token.ts
    ├─pages             # Page components
    ├─queries           # React Query related files
    ├─styles            # CSS/SCSS files
    ├─types             # Type definitions
    └─utils             # Utility functions
```



## Bundler-Specific Architectures

### React
The project follows a **component-based architecture** with React hooks, context, and optional state management.

📖 [React Architecture Guide](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/REACT_ARCHITECTURES.md)

### Rsbuild (Recommended)

**Rsbuild** is a blazing-fast build tool powered by Rspack (Rust-based). It offers:
- ⚡ 5-10x faster builds than Webpack
- 🚀 Zero-config setup with sensible defaults
- 🔄 Consistent Dev/Production builds
- 📦 Automatic code splitting and chunking
- ✅ Full Webpack plugin compatibility

The Rsbuild template includes optimized configuration for production builds with chunk splitting and minification.

📖 [Rsbuild Architecture Guide](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/RSBUILD_ARCHITECTURES.md)
📚 [Official Rsbuild Docs](https://rsbuild.rs/)

### Vite

**Vite** is a modern bundler focused on speed with:
- ⚡ Sub-second HMR (Hot Module Replacement)
- 🚀 Fast cold starts
- 📦 Optimized production builds
- 🎯 Great developer experience

The Vite template provides an alternative for developers who prefer Vite's approach.

📖 [Vite Architecture Guide](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/VITE_ARCHITECTURES.md)
📚 [Official Vite Docs](https://vite.dev/)



## Community

The b1nd-react-app community can be found on [GitHub Discussions](https://github.com/Team-B1ND/b1nd-react-app/discussions), where you can ask questions, share ideas, and showcase your projects with other community members.

Please note that our Code of Conduct applies to all b1nd-react-app community channels. We strongly encourage all users to read and adhere to the [Code of Conduct ](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/CODE_OF_CONDUCT.md) to ensure a respectful and productive environment for everyone.


## Contributing

Contributions to b1nd-react-app are welcome and highly appreciated. However, before you jump right into it, we would like you to review our [Contribution Guidelines](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/contributing.md) to ensure a smooth experience contributing to the project.

### Good First Issues:
We have a list of good first issues that are perfect for newcomers and beginners. These issues are relatively limited in scope, making them a great starting point to gain experience, understand the contribution process, and get familiar with the codebase. Check out the list of [good first issues](https://github.com/Team-B1ND/b1nd-react-app/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) and start contributing today! [How to write an issue](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/ISSUE.md)

---

We look forward to your contributions!


# DOCS

[한국어 DOCS](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/KO_README.md)


- [Test Documentation](https://github.com/Team-B1ND/b1nd-react-app/blob/main/docs/testing.md)
