/**
 * Type definition for the VS Code API available in webviews
 */
interface VSCodeAPI {
  /**
   * Post a message to the extension context
   */
  postMessage(message: any): void;
  
  /**
   * Get state persisted for this webview
   */
  getState(): any;
  
  /**
   * Set state persisted for this webview
   */
  setState(state: any): void;
}

/**
 * Acquire the VS Code API instance
 */
declare function acquireVsCodeApi(): VSCodeAPI;
