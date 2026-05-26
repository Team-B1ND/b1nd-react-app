<!--
Thanks for opening a PR! Your contribution is much appreciated.
To make sure your PR is handled as smoothly as possible we request that you follow the checklist sections below.
Choose the right checklist for the change(s) that you're making:


## For Contributors

### Improving Documentation
- **What?**: Improved the README file with updated installation instructions.
- **Why?**: The original documentation was outdated and some dependencies had changed. It was causing confusion for new users.
- **How?**: Added the correct steps for installing dependencies and updated the configuration settings.

### Adding or Updating Examples
- **What?**: Added an example of how to use the new `APIClient` class.
- **Why?**: The previous examples were missing usage for the latest features of the class.
- **How?**: Created a new section in the documentation and added code snippets demonstrating how to use the class with sample API calls.

### Fixing a bug
- **What?**: Fixed the issue where the `getUserData()` function was returning `undefined`.
- **Why?**: The function was failing to handle missing or malformed user data from the API.
- **How?**: Added a null check to ensure that the function properly handles API errors and returns a default response.

### Adding a feature
- **What?**: Added the ability to export data to CSV format.
- **Why?**: Users requested a feature that would allow them to export the application data to a CSV file for offline use.
- **How?**: Implemented a new function that formats the data as CSV and uses the browser’s download API to save the file.

---

## For Maintainers

### What?
- **What is the issue you're trying to solve?**: This is where you define what change you are proposing or implementing. It could be a new feature, bug fix, or documentation improvement.

  example:
  - The feature you are adding is a dark mode toggle.
  - You are fixing a bug that prevents users from logging in with OAuth.

### Why?
- **Why should this change be made?**: Explain the reasons for this change. Is it a response to feedback, or does it help improve the functionality of the software?

  example:
  - Users have requested a dark mode to improve visibility at night.
  - The bug fix is critical for users who cannot log in due to authentication issues.

### How?
- **How will this change be implemented?**: Provide details on how the changes will be made, what tools or techniques will be used, and if applicable, the steps involved in the process.

  example:
  - The dark mode will be implemented by toggling a CSS class that switches between light and dark themes.
  - The bug fix will involve changing the OAuth callback to properly handle tokens and manage the login flow.

---

-->