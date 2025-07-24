# WebViews Module

The `webviews` directory contains modular web projects that integrate seamlessly with the React Native application. These web projects share components (via the rnr component library), hooks, and utilities with the main React Native codebase.

## Creating a New WebView Module

Use the following command to scaffold a new webview module:

```bash
yarn webview:new "module_name"
```

This command generates:
- Automatic i18n integration
- Pre-configured build setup
- Shared component compatibility

## Development Commands

### Run a Specific Module in Development Mode
```bash
yarn webview:dev "module_name"
```

This starts the development server for the specified module with hot-reload enabled.

## Building WebView Modules

### Build a Specific Module
```bash
yarn webview:build "module_name"
```

### Build All Modules
```bash
yarn webview:build
```

## Output Directory

Built modules are output to:
```
/dist/webview/[module_name]
```
