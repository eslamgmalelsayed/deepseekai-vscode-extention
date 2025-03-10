# DeepSeek AI VS Code Extension

A VS Code extension that integrates DeepSeek AI into your development workflow.

## Features

- Chat with DeepSeek AI directly from VS Code
- Get AI-powered code suggestions and explanations
- Seamless integration with VS Code UI

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Visual Studio Code

### Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the extension:
   ```
   npm run compile
   ```

### Running the Extension

1. Open the project in VS Code
2. Press F5 to start debugging
3. A new VS Code window will open with the extension loaded
4. Click on the DeepSeek AI icon in the activity bar to open the chat interface

### Development Workflow

- Use `npm run watch` to automatically rebuild the extension when files change
- The extension uses Vue.js for the UI components
- Vite is used as the build tool for both the extension and webview

## Project Structure

- `src/extension.ts`: Main extension entry point
- `src/providers/`: Contains service providers for the extension
- `src/webview/`: Vue.js components for the UI
- `media/`: Static assets like icons

## Building for Production

```
npm run package
```

This will create a production-ready build of the extension.

## License

MIT
