# React Grab VisBug Copy

Track visual edits made with [VisBug](https://visbug.web.app/) and copy them with file paths to give to AI agents.

![React Grab VisBug Copy](https://img.shields.io/badge/React-Grab-VisBug-purple?style=for-the-badge)

## What is this?

This tool combines **VisBug's visual editing capabilities** with **React Grab's selection system** to help you:

1. 🎨 **Visually edit** any element on a page (colors, fonts, spacing, etc.)
2. 📍 **Track** the changes you made
3. 📋 **Copy** the changes as CSS + HTML to give to AI agents

## Installation

### Option 1: Download & Use Locally

```bash
# Clone or download this repository
git clone https://github.com/jacksonkasi1/react-grab-visbug-copy.git
```

### Option 2: NPM Package (Coming Soon)

```bash
npm install react-grab-visbug-copy
# or
pnpm add react-grab-visbug-copy
```

## Quick Start

### Prerequisites

1. **Install VisBug Chrome Extension**
   - Visit: https://visbug.web.app/
   - Click "Add to Chrome"

2. **Install React Grab**
   - Clone: https://github.com/aidenybai/react-grab
   - Or use the built version from this repo

### Using the Demo

1. Open `examples/web/with-visbug-extension.html` in your browser
2. Click the **VisBug extension icon** in your browser toolbar to activate VisBug
3. Press `Cmd + C` (Mac) or `Ctrl + C` (Windows) to activate React Grab
4. Click on any element to select it
5. Use VisBug tools to visually edit:
   - 🎨 Paint bucket → change colors
   - **A** → change fonts/text
   - ↔️ → change spacing
   - ⬛ → change shadows/borders
6. Press `T` to track the element (stores original state)
7. Make your visual changes with VisBug
8. Press `C` to copy the changes

## Usage

### HTML (Script Tag)

```html
<!-- Load React Grab first -->
<script src="path/to/react-grab/dist/index.global.js"></script>

<!-- Load VisBug Copy -->
<script src="path/to/react-grab-visbug-copy/dist/client/standalone.js"></script>
```

### JavaScript (Module)

```javascript
import { attachVisBugCopy } from 'react-grab-visbug-copy';

attachVisBugCopy();
```

## How It Works

1. **Activate**: Press `Cmd+C` to activate React Grab overlay
2. **Select**: Click on any element to select it
3. **Track**: Press `T` to track the element's original styles
4. **Edit**: Use VisBug tools to make visual changes
5. **Copy**: Press `C` to copy the changes

## Output Format

When you copy changes, you'll get output like:

```markdown
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
```

## Example: Giving Changes to AI

Copy the output and paste to your AI:

```
I changed the button background color to rgb(214, 135, 92) and increased 
the font size to 24px. Please apply these changes to the actual codebase.

Here are the changes:

[PASTE THE OUTPUT FROM VISBUG COPY]
```

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
