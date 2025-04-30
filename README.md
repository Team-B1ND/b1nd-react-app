## B1ND AUTH TEMPLATE
# Overview
B1ND AUTH TEMPLATE is a template that allows you to quickly implement authentication-related functionality. This project is written in React and is configured with Axios and interceptors for efficient API communication. The project structure is extensible and can be used in various environments.

## HOW TO USE?

### START

You can start with `npx b1nd-react-app [projectname]`.

1. `? Which bundler do you want to use?` - You can choose the bundler.
❯   Default (No bundler)
    Webpack (Recommended)
    Vite

2. `? Which language do you want to use?` - Choose the language you want to use.
❯   TypeScript
    JavaScript

3. `? Which package manager would you like to use?` - Choose your package manager.
❯   npm
    yarn
    pnpm
    bun

4. `? Do you want to include Axios?` - Choose whether to include Axios with default settings.
❯   Yes
    No


### HOW TO INSTALL
![화면 기록 2025-03-25 오전 11 41 31](https://github.com/user-attachments/assets/ea5a7a11-705a-48d4-812b-c0d8b8df8ca8)




### USER EDITING POINT

1. Please change the `server` property in `src/config/config.json` to your API BASE_URL.
2. Change the refresh endpoint in line 32 of `src/libs/responseInterceptor.ts` to your API endpoint. Also, modify the BODY in line 33 to match your API’s request body.
3. Change the login URL in line 12 of `src/libs/requestInterceptor.ts` to your login URL.

# ETC
* If you do not need or have a different token usage process, you can delete the token-related folders.

1. Tokens are divided into `accessToken` and `refreshToken`, and they are stored in cookies as `accessToken` and `refreshToken`.
2. To store tokens, use `token.setToken({TOKEN_CONSTANTS}, [value]);`. For example: `token.setToken(ACCESS_TOKEN_KEY, res.data.data.accessToken);`
3. This folder structure is designed for developing React projects using the FLUX architecture. [What is FLUX?](https://velog.io/@alskt0419/FLUX-%EC%95%84%ED%82%A4%ED%85%8D%EC%B3%90%EB%9E%80)
4. For communication with the server, using `react-query` will make it even more convenient.
5. You can use either `webpack` or `vite` as the bundler.



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



## Framework-Specific Architectures
 # REACT
 For React, the project follows a component-based architecture that utilizes hooks, context, and state management as necessary. Here is the general structure for React
[GOTO-ARCHITECTURES](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/REACT_ARCHITECTURES.md)

 # VITE
 Vite is a build tool that focuses on speed and performance. The structure is similar to React, but it is optimized for fast development and builds. Here is the general structure for a Vite project
[GOTO-ARCHITECTURES](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/VITE_ARCHITECTURES.md)

# WEBPACK
 Webpack is a bundler that requires more configuration but is extremely flexible. The structure includes configurations for handling assets, code splitting, and optimization. 
[GOTO-ARCHITECTURES](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/WEBPACK_ARCHITECTURES.md)



## Community

The B1ND AUTH TEMPLATE community can be found on [GitHub Discussions](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/discussions), where you can ask questions, share ideas, and showcase your projects with other community members.

Please note that our Code of Conduct applies to all B1ND AUTH TEMPLATE community channels. We strongly encourage all users to read and adhere to the [Code of Conduct ](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/CODE_OF_CONDUCT.md) to ensure a respectful and productive environment for everyone.


## Contributing

Contributions to B1ND AUTH TEMPLATE are welcome and highly appreciated. However, before you jump right into it, we would like you to review our [Contribution Guidelines](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/contributing.md) to ensure a smooth experience contributing to the project.

### Good First Issues:
We have a list of good first issues that are perfect for newcomers and beginners. These issues are relatively limited in scope, making them a great starting point to gain experience, understand the contribution process, and get familiar with the codebase. Check out the list of [good first issues](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/issues?q=is%3Aissue%20state%3Aopen%20label%3A%22good%20first%20issue%22) and start contributing today! [How to write an issue](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/ISSUE.md)

---

We look forward to your contributions!


# DOCS

[한국어 DOCS](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/KO_README.md)


- [Test Documentation](https://github.com/Team-B1ND/B1ND-AUTH-TEMPLATE/tree/main/docs/testing.md)
