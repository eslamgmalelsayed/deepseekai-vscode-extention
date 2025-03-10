import * as vscode from 'vscode';
import { ChatViewProvider } from './providers/ChatViewProvider';

export function activate(context: vscode.ExtensionContext) {
  console.log('DeepSeek AI extension is now active!');

  // Register the chat webview provider
  const chatViewProvider = new ChatViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'deepseekai.chatView',
      chatViewProvider
    )
  );

  // Register the command to start DeepSeek AI
  let disposable = vscode.commands.registerCommand('deepseekai.start', () => {
    vscode.window.showInformationMessage('DeepSeek AI is ready to assist you!');
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  console.log('DeepSeek AI extension is now deactivated!');
}
