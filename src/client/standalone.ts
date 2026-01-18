/**
 * VisBug Copy - Standalone build for browser use
 * Tracks visual changes made by VisBug and copies them for AI
 */

(function() {
  'use strict';

  if (typeof window === 'undefined') return;

  function waitForReactGrab(callback, attempts = 50) {
    if (attempts <= 0) {
      console.warn('[VisBug Copy] React Grab not found');
      return;
    }
    const api = window.__REACT_GRAB__;
    if (api && typeof api.registerPlugin === 'function') {
      callback(api);
      return;
    }
    const handleInit = (event) => {
      window.removeEventListener('react-grab:init', handleInit);
      const api = event.detail;
      if (api && typeof api.registerPlugin === 'function') {
        callback(api);
      }
    };
    window.addEventListener('react-grab:init', handleInit);
    setTimeout(() => waitForReactGrab(callback, attempts - 1), 100);
  }

  // Track element state - store initial inline styles
  const elementStates = new Map();
  const trackedElements = new Map();

  const IMPORTANT_STYLES = new Set([
    'color', 'background-color', 'background', 'font-size', 'font-weight',
    'font-family', 'font-style', 'text-align', 'text-decoration', 'line-height',
    'letter-spacing', 'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'border', 'border-radius', 'box-shadow', 'width', 'height', 'display', 'opacity'
  ]);

  function getInlineStyles(element) {
    const styles = {};
    if (!(element instanceof HTMLElement)) return styles;

    const styleAttr = element.getAttribute('style') || '';
    if (styleAttr) {
      styleAttr.split(';').forEach(rule => {
        const [prop, value] = rule.split(':').map(s => s.trim());
        if (prop && value && IMPORTANT_STYLES.has(prop)) {
          styles[prop] = value;
        }
      });
    }
    return styles;
  }

  function getComputedStyles(element) {
    const styles = {};
    if (!(element instanceof HTMLElement)) return styles;

    const computed = window.getComputedStyle(element);
    for (const prop of IMPORTANT_STYLES) {
      const value = computed.getPropertyValue(prop);
      if (value && value !== '' && value !== '0px' && value !== 'none') {
        styles[prop] = value;
      }
    }
    return styles;
  }

  function captureElementState(element) {
    return {
      element,
      inlineStyles: getInlineStyles(element),
      computedStyles: getComputedStyles(element),
      outerHTML: element.outerHTML,
      timestamp: Date.now()
    };
  }

  function generateElementId(element) {
    const tagName = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const classes = element.className ? `.${element.className.split(' ').slice(0, 2).join('.')}` : '';
    return `${tagName}${id}${classes}`;
  }

  function compareInlineStyles(oldInline, newInline) {
    const changes = [];
    const allProps = new Set([...Object.keys(oldInline), ...Object.keys(newInline)]);
    for (const prop of allProps) {
      const oldValue = oldInline[prop] || null;
      const newValue = newInline[prop] || null;
      if (oldValue !== newValue) {
        changes.push({ property: prop, oldValue, newValue });
      }
    }
    return changes;
  }

  function formatStyleChange(change) {
    const { property, oldValue, newValue } = change;
    const cssProp = property.replace(/([A-Z])/g, '-$1').toLowerCase();
    return `${cssProp}: ${newValue || 'unset'}`;
  }

  function formatChanges(changes) {
    if (changes.length === 0) return '  No style changes detected';

    return changes.map(change => {
      const cssProp = change.property.replace(/([A-Z])/g, '-$1').toLowerCase();
      return `  • ${cssProp}: ${change.oldValue || 'unset'} → ${change.newValue || 'unset'}`;
    }).join('\n');
  }

  function buildDiffOutput(element, changes) {
    const tagName = element.tagName.toLowerCase();
    const className = element.className || '';
    const id = element.id || '';

    // Build CSS diff
    const cssDiff = changes.length > 0
      ? changes.map(formatStyleChange).join(';\n  ')
      : '';

    // Build full CSS block
    const fullCSS = cssDiff ? `\n  ${cssDiff};` : '';

    return `# Visual Changes

## File Location
*Track which file contains this component*

## Changes (${changes.length} style change${changes.length !== 1 ? 's' : ''})
${formatChanges(changes)}

## Updated CSS
\`\`\`css
${tagName}${className ? `.${className.split(' ').join('.')}` : ''} {${fullCSS}
}
\`\`\`

## Updated HTML
\`\`\`html
${element.outerHTML}
\`\`\`

---
*Tracked with React Grab VisBug Copy*
`;
  }

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text)
        .then(() => true)
        .catch(() => {
          const textarea = document.createElement('textarea');
          textarea.value = text;
          textarea.style.position = 'fixed';
          textarea.style.opacity = '0';
          document.body.appendChild(textarea);
          textarea.select();
          try {
            document.execCommand('copy');
            return true;
          } catch {
            return false;
          } finally {
            document.body.removeChild(textarea);
          }
        });
    }
    return Promise.resolve(false);
  }

  function createVisBugCopyActions() {
    return [
      {
        id: 'track-element',
        label: 'Track Element',
        shortcut: 't',
        onAction: ({ element }) => {
          const id = generateElementId(element);
          const state = captureElementState(element);
          elementStates.set(id, state);
          trackedElements.set(id, element);
          console.log('[VisBug Copy] ✓ Tracked element:', id);
        }
      },
      {
        id: 'copy-visual-changes',
        label: 'Copy Changes',
        shortcut: 'c',
        onAction: async ({ elements }) => {
          let allChanges = [];
          for (const element of elements) {
            const id = generateElementId(element);
            const originalState = elementStates.get(id);
            if (!originalState) continue;

            const newInline = getInlineStyles(element);
            const changes = compareInlineStyles(originalState.inlineStyles, newInline);
            allChanges = allChanges.concat(changes);
          }

          if (allChanges.length === 0) {
            console.log('[VisBug Copy] No changes detected. Press T first to track!');
            return;
          }

          const diffOutput = buildDiffOutput(elements[0], allChanges);
          const success = await copyToClipboard(diffOutput);
          console.log('[VisBug Copy] Changes copied:', success ? '✓' : '✗');
        }
      },
      {
        id: 'clear-tracked-changes',
        label: 'Clear',
        shortcut: 'x',
        onAction: () => {
          elementStates.clear();
          trackedElements.clear();
          console.log('[VisBug Copy] Cleared');
        }
      }
    ];
  }

  waitForReactGrab((api) => {
    const actions = createVisBugCopyActions();

    api.registerPlugin({
      name: 'visbug-copy',
      theme: {
        selectionBox: { enabled: true },
        elementLabel: { enabled: true }
      },
      actions
    });

    console.log('[VisBug Copy] Plugin registered ✓');
  });

  window.__REACT_GRAB_VISBUG_COPY__ = {
    version: '0.1.0',
    track: (element) => {
      const id = generateElementId(element);
      const state = captureElementState(element);
      elementStates.set(id, state);
      trackedElements.set(id, element);
    },
    getTrackedElements: () => Array.from(trackedElements.values()),
    clear: () => {
      elementStates.clear();
      trackedElements.clear();
    }
  };

})();
