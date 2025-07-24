# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
- `yarn start` - Start Metro bundler with reset cache for React Native development
- `yarn android` - Run on Android device/emulator
- `yarn ios` - Run on iOS device/simulator
- `yarn ios:simulator` - Open iOS Simulator
- `yarn ios:pod:install` - Install iOS CocoaPods dependencies
- `yarn webview:dev` - Start Rsbuild development server for webview components
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Run ESLint with auto-fix
- `yarn test` - Run Jest tests
- `yarn clean` - Clean React Native cache and build artifacts

### Documentation
- `yarn docs:dev` - Start VitePress documentation development server
- `yarn docs:build` - Build documentation
- `yarn docs:preview` - Preview built documentation

## Project Architecture

### Technology Stack
- **React Native 0.79.2** - Cross-platform mobile framework
- **NativeWind 4.x** - Tailwind CSS for React Native
- **React Navigation 7.x** - Navigation with bottom tabs
- **i18next** - Internationalization with English and Chinese support
- **SWR** - Data fetching and caching
- **TypeScript** - Type safety
- **React Native Web** - Web platform support
- **Rsbuild** - Modern web bundler for webview components

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI primitives (button, input, text, etc.)
│   ├── layout.tsx      # Main navigation layout with bottom tabs
│   └── toggle-theme.tsx # Theme switching component
├── hooks/              # Custom React hooks
│   └── useColorScheme.tsx # Color scheme management
├── lib/                # Utilities and configurations
│   ├── constants.ts    # App constants including navigation themes
│   ├── fetcher.ts      # SWR data fetching utilities
│   ├── i18n.ts         # i18next configuration
│   ├── utils.ts        # General utility functions
│   └── icons/          # Custom icon components
├── locales/            # Translation files
│   ├── en-US.ts        # English translations
│   └── zh-CN.ts        # Chinese translations
├── pages/              # Screen components
│   ├── home.tsx        # Home screen
│   ├── login.tsx       # Login screen
│   └── setting.tsx     # Settings screen
└── webviews/           # WebView components for embedded web content
    └── editor/         # Web-based editor components
```

### Key Patterns

#### Path Aliases
- Use `~/` as alias for `src/` directory in imports
- Example: `import { useColorScheme } from '~/hooks/useColorScheme'`

#### Theme System
- Supports light/dark themes via NativeWind's CSS variables
- Theme colors defined in `tailwind.config.js` using HSL CSS custom properties
- Use `useColorScheme` hook for theme state management
- Navigation themes configured in `~/lib/constants.ts`

#### Internationalization
- Two languages supported: English (`en`) and Chinese (`zh`)
- Translation files in `src/locales/`
- Use `useTranslation` hook from `react-i18next`
- Configure additional languages in `src/lib/i18n.ts`

#### Component Architecture
- UI components in `src/components/ui/` follow a design system pattern
- Layout component (`src/components/layout.tsx`) handles main navigation
- Screen components in `src/pages/` for different app sections

#### Cross-Platform Support
- React Native Web configured for web platform compatibility
- Webview components use Rsbuild for modern web development
- SVG support configured in Metro bundler

### Configuration Files
- `metro.config.js` - Metro bundler with NativeWind and SVG transformer
- `babel.config.js` - Babel with React Native and NativeWind presets  
- `tailwind.config.js` - Tailwind CSS with custom theme and NativeWind preset
- `rsbuild.config.ts` - Rsbuild configuration for webview development
- `tsconfig.json` - TypeScript with path aliases and React Native Web types

### Testing
- Jest configured with React Native preset
- Test files should use `.test.tsx` extension
- Place tests in `__tests__/` directory or colocated with components

### Build Requirements
- Node.js >= 18
- React Native CLI for mobile development
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK