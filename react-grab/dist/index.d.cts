import { R as ReactGrabAPI } from './index-BUAJ3r2H.cjs';
export { s as ActionContext, q as ActivationMode, o as AgentCompleteResult, A as AgentContext, n as AgentOptions, l as AgentProvider, k as AgentSession, m as AgentSessionStorage, r as ContextMenuAction, C as CrosshairContext, D as DEFAULT_THEME, h as DeepPartial, e as DragRect, j as ElementLabelContext, E as ElementLabelVariant, G as GrabbedBox, O as Options, d as OverlayBounds, t as Plugin, u as PluginConfig, v as PluginHooks, P as PromptModeContext, c as ReactGrabState, f as Rect, p as SettableOptions, S as SourceInfo, T as Theme, a as formatElementInfo, b as generateSnippet, g as getStack, i as init } from './index-BUAJ3r2H.cjs';
export { isInstrumentationActive } from 'bippy';
import 'bippy/source';

interface ElementBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
declare const combineBounds: (boundsList: ElementBounds[]) => ElementBounds;
declare const captureElementScreenshot: (bounds: ElementBounds) => Promise<Blob>;
declare const copyImageToClipboard: (blob: Blob) => Promise<boolean>;

declare const isScreenshotSupported: () => boolean;

declare global {
    interface Window {
        __REACT_GRAB__?: ReactGrabAPI;
    }
}
declare const getGlobalApi: () => ReactGrabAPI | null;
declare const setGlobalApi: (api: ReactGrabAPI | null) => void;

export { type ElementBounds, ReactGrabAPI, captureElementScreenshot, combineBounds, copyImageToClipboard, getGlobalApi, isScreenshotSupported, setGlobalApi };
