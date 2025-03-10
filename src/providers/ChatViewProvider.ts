import * as vscode from 'vscode';
import { getNonce } from '../utils/getNonce';

export class ChatViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    // Handle messages from the webview
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'sendMessage':
          // Handle sending message to DeepSeek AI
          this._handleSendMessage(data.message);
          break;
      }
    });
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'main.js')
    );
    const styleUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'webview', 'style.css')
    );

    const nonce = getNonce();

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; script-src 'nonce-${nonce}'; connect-src https://api.deepseek.com;">
        <link href="${styleUri}" rel="stylesheet">
        <title>DeepSeek AI Chat</title>
      </head>
      <body>
        <div id="app"></div>
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }

  private async _handleSendMessage(message: string) {
    // Here you would integrate with DeepSeek API
    try {
      // Mock response for now
      const response = `DeepSeek AI would process: "${message}"`;
      
      // Send response back to webview
      if (this._view) {
        this._view.webview.postMessage({
          type: 'receiveMessage',
          message: response
        });
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Error communicating with DeepSeek AI: ${error}`);
    }
  }
}
