import type { Plugin } from './definitions';
export interface WebViewPlugin extends Plugin {
    setServerBasePath(options: WebViewPath): Promise<void>;
    getServerBasePath(): Promise<WebViewPath>;
    persistServerBasePath(): Promise<void>;
}
export interface WebViewPath {
    path: string;
}
export declare const WebView: WebViewPlugin;
