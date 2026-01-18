var VisBugCopy=(()=>{(function(){"use strict";if(typeof window>"u")return;function u(t,e=50){if(e<=0){console.warn("[VisBug Copy] React Grab not found");return}let o=window.__REACT_GRAB__;if(o&&typeof o.registerPlugin=="function"){t(o);return}let s=n=>{window.removeEventListener("react-grab:init",s);let r=n.detail;r&&typeof r.registerPlugin=="function"&&t(r)};window.addEventListener("react-grab:init",s),setTimeout(()=>u(t,e-1),100)}let a=new Map,c=new Map,d=new Set(["color","background-color","background","font-size","font-weight","font-family","font-style","text-align","text-decoration","line-height","letter-spacing","padding","padding-top","padding-right","padding-bottom","padding-left","margin","margin-top","margin-right","margin-bottom","margin-left","border","border-radius","box-shadow","width","height","display","opacity"]);function p(t){let e={};if(!(t instanceof HTMLElement))return e;let o=t.getAttribute("style")||"";return o&&o.split(";").forEach(s=>{let[n,r]=s.split(":").map(i=>i.trim());n&&r&&d.has(n)&&(e[n]=r)}),e}function f(t){let e={};if(!(t instanceof HTMLElement))return e;let o=window.getComputedStyle(t);for(let s of d){let n=o.getPropertyValue(s);n&&n!==""&&n!=="0px"&&n!=="none"&&(e[s]=n)}return e}function g(t){return{element:t,inlineStyles:p(t),computedStyles:f(t),outerHTML:t.outerHTML,timestamp:Date.now()}}function l(t){let e=t.tagName.toLowerCase(),o=t.id?`#${t.id}`:"",s=t.className?`.${t.className.split(" ").slice(0,2).join(".")}`:"";return`${e}${o}${s}`}function y(t,e){let o=[],s=new Set([...Object.keys(t),...Object.keys(e)]);for(let n of s){let r=t[n]||null,i=e[n]||null;r!==i&&o.push({property:n,oldValue:r,newValue:i})}return o}function h(t){let{property:e,oldValue:o,newValue:s}=t;return`${e.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${s||"unset"}`}function m(t){return t.length===0?"  No style changes detected":t.map(e=>`  \u2022 ${e.property.replace(/([A-Z])/g,"-$1").toLowerCase()}: ${e.oldValue||"unset"} \u2192 ${e.newValue||"unset"}`).join(`
`)}function w(t,e){let o=t.tagName.toLowerCase(),s=t.className||"",n=t.id||"",r=e.length>0?e.map(h).join(`;
  `):"",i=r?`
  ${r};`:"";return`# Visual Changes

## File Location
*Track which file contains this component*

## Changes (${e.length} style change${e.length!==1?"s":""})
${m(e)}

## Updated CSS
\`\`\`css
${o}${s?`.${s.split(" ").join(".")}`:""} {${i}
}
\`\`\`

## Updated HTML
\`\`\`html
${t.outerHTML}
\`\`\`

---
*Tracked with React Grab VisBug Copy*
`}function C(t){return navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(t).then(()=>!0).catch(()=>{let e=document.createElement("textarea");e.value=t,e.style.position="fixed",e.style.opacity="0",document.body.appendChild(e),e.select();try{return document.execCommand("copy"),!0}catch{return!1}finally{document.body.removeChild(e)}}):Promise.resolve(!1)}function b(){return[{id:"track-element",label:"Track Element",shortcut:"t",onAction:({element:t})=>{let e=l(t),o=g(t);a.set(e,o),c.set(e,t),console.log("[VisBug Copy] \u2713 Tracked element:",e)}},{id:"copy-visual-changes",label:"Copy Changes",shortcut:"c",onAction:async({elements:t})=>{let e=[];for(let n of t){let r=l(n),i=a.get(r);if(!i)continue;let T=p(n),$=y(i.inlineStyles,T);e=e.concat($)}if(e.length===0){console.log("[VisBug Copy] No changes detected. Press T first to track!");return}let o=w(t[0],e),s=await C(o);console.log("[VisBug Copy] Changes copied:",s?"\u2713":"\u2717")}},{id:"clear-tracked-changes",label:"Clear",shortcut:"x",onAction:()=>{a.clear(),c.clear(),console.log("[VisBug Copy] Cleared")}}]}u(t=>{let e=b();t.registerPlugin({name:"visbug-copy",theme:{selectionBox:{enabled:!0},elementLabel:{enabled:!0}},actions:e}),console.log("[VisBug Copy] Plugin registered \u2713")}),window.__REACT_GRAB_VISBUG_COPY__={version:"0.1.0",track:t=>{let e=l(t),o=g(t);a.set(e,o),c.set(e,t)},getTrackedElements:()=>Array.from(c.values()),clear:()=>{a.clear(),c.clear()}}})();})();
