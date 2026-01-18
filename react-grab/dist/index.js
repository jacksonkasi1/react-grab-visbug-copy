import {k}from'./chunk-M5LI2UTI.js';export{j as DEFAULT_THEME,h as captureElementScreenshot,g as combineBounds,i as copyImageToClipboard,d as formatElementInfo,f as generateSnippet,c as getStack,k as init,b as isInstrumentationActive,a as isScreenshotSupported}from'./chunk-M5LI2UTI.js';/**
 * @license MIT
 *
 * Copyright (c) 2025 Aiden Bai
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e=null,c=()=>typeof window>"u"?e:window.__REACT_GRAB__??e??null,f=t=>{e=t,typeof window<"u"&&(t?window.__REACT_GRAB__=t:delete window.__REACT_GRAB__);};typeof window<"u"&&(window.__REACT_GRAB__?e=window.__REACT_GRAB__:(e=k(),window.__REACT_GRAB__=e),window.dispatchEvent(new CustomEvent("react-grab:init",{detail:e})));export{c as getGlobalApi,f as setGlobalApi};