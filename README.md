# React Grab VisBug Copy

Track visual edits made with [VisBug](https://visbug.web.app/) and copy them with file paths to give to AI agents.

![React Grab VisBug Copy](https://img.shields.io/badge/React-Grab-VisBug-purple?style=for-the-badge)

## What is this?

This tool combines **VisBug's visual editing capabilities** with **React Grab's selection system** to help you:

1. 🎨 **Visually edit** any element on a page (colors, fonts, spacing, etc.)
2. 📍 **Track** the changes you made
3. 📋 **Copy** the changes as CSS + HTML to give to AI agents

## Installation

### NPM Package

```bash
npm install react-grab-visbug-copy
# or
pnpm add react-grab-visbug-copy
```

### Download Locally

```bash
# Clone or download this repository
git clone https://github.com/jacksonkasi1/react-grab-visbug-copy.git
```

## Framework Integration

### Next.js (App Router)

Add this to your `app/layout.tsx`:

```tsx
import { Script } from "next/script";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              src="https://unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
            <Script
              src="https://unpkg.com/react-grab-visbug-copy/dist/client/standalone.js"
              strategy="lazyOnload"
            />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

Add this to your `pages/_document.tsx`:

```tsx
import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              src="https://unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
            <Script
              src="https://unpkg.com/react-grab-visbug-copy/dist/client/standalone.js"
              strategy="lazyOnload"
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

### Vite

Add this to your `index.html` in the `<head>`:

```html
<script type="module">
  if (import.meta.env.DEV) {
    import("react-grab");
    import("react-grab-visbug-copy");
  }
</script>
```

Or import in your main entry file:

```tsx
// src/main.tsx or src/main.jsx
if (process.env.NODE_ENV === "development") {
  import("react-grab");
  import("react-grab-visbug-copy");
}

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Webpack

Add to your webpack config or HTML template:

```html
<script src="https://unpkg.com/react-grab/dist/index.global.js"></script>
<script src="https://unpkg.com/react-grab-visbug-copy/dist/client/standalone.js"></script>
```

Or use dynamic import in your entry file:

```javascript
if (process.env.NODE_ENV === "development") {
  import("react-grab");
  import("react-grab-visbug-copy");
}
```

### Plain HTML

```html
<!doctype html>
<html lang="en">
  <head>
    <script src="https://unpkg.com/react-grab/dist/index.global.js"></script>
    <script src="https://unpkg.com/react-grab-visbug-copy/dist/client/standalone.js"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

## Live Examples

Try these interactive examples to see VisBug Copy in action:

| Example | Description | Demo |
|---------|-------------|------|
| [01-basic-button.html](/examples/web/01-basic-button.html) | Simple button with hover effects | Click the button, edit styles with VisBug |
| [02-card-component.html](/examples/web/02-card-component.html) | Card UI components | Edit cards with images and text |
| [03-navigation-bar.html](/examples/web/03-navigation-bar.html) | Navbar and hero section | Edit navigation and CTA buttons |
| [04-form-elements.html](/examples/web/04-form-elements.html) | Form inputs and buttons | Edit form styling and focus states |

### Running Examples Locally

```bash
# Clone the repository
git clone https://github.com/jacksonkasi1/react-grab-visbug-copy.git

# Open any example in your browser
open examples/web/01-basic-button.html
# or
cd examples/web && python3 -m http.server 8080
# Then visit http://localhost:8080/01-basic-button.html
```

## How It Works

1. **Activate**: Press `Cmd+C` (Mac) or `Ctrl+C` (Windows) to activate React Grab overlay
2. **Select**: Click on any element to select it
3. **Track**: Press `T` to track the element's original styles
4. **Edit**: Use VisBug tools to make visual changes
5. **Copy**: Press `C` to copy the changes

## Output Format

When you copy changes, you'll get output like:

# Visual Changes

## File Location
*Track which file contains this component*

## Changes (2 style changes)
  • background-color: rgb(102, 126, 234) → rgb(214, 135, 92)
  • font-size: 16px → 24px

## Updated CSS
```css
button.btn {
  background-color: rgb(214, 135, 92);
  font-size: 24px;
}
```

## Updated HTML
```html
<button class="btn" style="background-color: rgb(214, 135, 92); font-size: 24px;">Click me</button>
```

---
*Tracked with React Grab VisBug Copy*

## Example: Giving Changes to AI

Copy the output and paste to your AI:

> I changed the button background color to rgb(214, 135, 92) and increased 
> the font size to 24px. Please apply these changes to the actual codebase.
>
> Here are the changes:
>
> [PASTE THE OUTPUT FROM VISBUG COPY]

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl + C` | Activate React Grab |
| `T` | Track selected element |
| `C` | Copy visual changes |
| `X` | Clear tracked changes |

## API

### Global API

```javascript
// Get the global API
const api = window.__REACT_GRAB_VISBUG_COPY__;

// Track an element manually
api.track(element);

// Get all tracked elements
const elements = api.getTrackedElements();

// Clear all tracked changes
api.clear();
```

## Project Structure

```
react-grab-visbug-copy/
├── src/
│   └── client/
│       └── standalone.ts    # Main source code
├── dist/
│   └── client/
│       ├── standalone.js    # ES module build
│       └── standalone.cjs   # CommonJS build
├── examples/
│   └── web/
│       └── with-visbug-extension.html  # Demo page
├── package.json
└── README.md
```

## Requirements

- Chrome browser with VisBug extension installed
- React Grab library
- Modern browser with Clipboard API support

## Use Cases

### 💻 Code Reviews

Include visual change diffs in PR descriptions to show what was modified.

### 🤖 AI-Assisted Development

Describe visual changes to AI and let it apply them to your codebase.

### 📝 Documentation

Track visual changes during design iteration and document them.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details.

## Credits

- [VisBug](https://visbug.web.app/) - Open source web design debug tools
- [React Grab](https://react-grab.com/) - Select context for coding agents

---

⭐ **Star this repo if it helps you!**
