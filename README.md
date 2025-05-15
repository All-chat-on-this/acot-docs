 # ACOT Documentation

This repository contains the documentation for ACOT (All Chat On This), a language model caller with powerful compatibility.

## About ACOT

ACOT is a custom large language model caller that provides a unified interface to connect with virtually any LLM API. By configuring API formats specified by major model platforms, ACOT automatically converts request and response data during API interactions into a unified format, achieving cross-platform API adaptation.

### Key Features

- **Wide Compatibility**: Connect to multiple third-party large model providers with a unified interface, supporting virtually any LLM with an open API.
- **Global Unrestricted Access**: With the help of third-party VPN relay servers, ACOT can call various advanced models from both domestic and international sources without restrictions.
- **Unified Session Management**: Seamlessly switch between different models within the same conversation while maintaining complete context.
- **API Key Management**: Securely store and manage your API keys with client-side encryption.

## Documentation

This documentation site is built using [VitePress](https://vitepress.dev/), a Vue-powered static site generator.

### Running Locally

To run the documentation site locally:

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run docs:dev
   ```
4. Build for production:
   ```
   npm run docs:build
   ```
5. Preview the production build:
   ```
   npm run docs:preview
   ```

## Documentation Structure

- **What is ACOT**: Introduction to ACOT and its capabilities
- **Usage of Configuration**: Detailed guide on how to configure ACOT
- **About Security**: Information about API key security and encryption mechanisms

## Languages

Documentation is available in:
- English
- 简体中文 (Simplified Chinese)

## Contributing

Contributions to improve the documentation are welcome. Please feel free to submit pull requests or open issues if you find any errors or areas that need improvement.