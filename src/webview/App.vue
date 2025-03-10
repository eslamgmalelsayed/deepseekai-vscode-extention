<template>
  <div class="container">
    <header class="header">
      <h1>DeepSeek AI Assistant</h1>
    </header>
    
    <div class="chat-container" ref="chatContainer">
      <div v-for="(message, index) in messages" :key="index" class="message" :class="message.sender">
        <div class="message-content">
          <div class="sender-name">{{ message.sender === 'user' ? 'You' : 'DeepSeek AI' }}</div>
          <div class="message-text">{{ message.text }}</div>
        </div>
      </div>
    </div>
    
    <div class="input-container">
      <textarea 
        v-model="userInput" 
        @keydown.enter.prevent="sendMessage"
        placeholder="Ask DeepSeek AI something..."
        class="input-field"
        ref="inputField"
      ></textarea>
      <button @click="sendMessage" class="send-button">
        <span>Send</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';

// Interface for chat messages
interface Message {
  text: string;
  sender: 'user' | 'assistant';
}

// State
const userInput = ref('');
const messages = ref<Message[]>([
  { text: 'Hello! I am DeepSeek AI. How can I help you today?', sender: 'assistant' }
]);
const chatContainer = ref<HTMLElement | null>(null);
const inputField = ref<HTMLTextAreaElement | null>(null);

// VS Code API for communication with extension
const vscode = acquireVsCodeApi();

// Scroll to bottom of chat
const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Send message to extension
const sendMessage = () => {
  if (userInput.value.trim() === '') return;
  
  // Add user message to chat
  messages.value.push({
    text: userInput.value,
    sender: 'user'
  });
  
  // Send message to extension
  vscode.postMessage({
    type: 'sendMessage',
    message: userInput.value
  });
  
  // Clear input
  userInput.value = '';
  
  // Focus on input field
  if (inputField.value) {
    inputField.value.focus();
  }
};

// Watch for messages from extension
onMounted(() => {
  window.addEventListener('message', event => {
    const message = event.data;
    
    switch (message.type) {
      case 'receiveMessage':
        messages.value.push({
          text: message.message,
          sender: 'assistant'
        });
        break;
    }
  });
  
  // Focus on input field
  if (inputField.value) {
    inputField.value.focus();
  }
});

// Watch for changes in messages to scroll to bottom
watch(messages, () => {
  scrollToBottom();
}, { deep: true });
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.header {
  padding: 10px 15px;
  border-bottom: 1px solid var(--vscode-panel-border);
}

.header h1 {
  font-size: 16px;
  margin: 0;
  color: var(--vscode-foreground);
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 80%;
  padding: 8px 12px;
  border-radius: 8px;
  margin-bottom: 8px;
}

.message.user {
  align-self: flex-end;
  background-color: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
}

.message.assistant {
  align-self: flex-start;
  background-color: var(--vscode-editor-inactiveSelectionBackground);
  color: var(--vscode-foreground);
}

.sender-name {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  word-wrap: break-word;
}

.input-container {
  display: flex;
  padding: 10px 15px;
  border-top: 1px solid var(--vscode-panel-border);
  background-color: var(--vscode-editor-background);
}

.input-field {
  flex: 1;
  min-height: 40px;
  max-height: 120px;
  padding: 8px 12px;
  border: 1px solid var(--vscode-input-border);
  border-radius: 4px;
  background-color: var(--vscode-input-background);
  color: var(--vscode-input-foreground);
  resize: none;
  font-family: inherit;
  font-size: 14px;
}

.input-field:focus {
  outline: none;
  border-color: var(--vscode-focusBorder);
}

.send-button {
  margin-left: 10px;
  padding: 0 15px;
  background-color: var(--vscode-button-background);
  color: var(--vscode-button-foreground);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.send-button:hover {
  background-color: var(--vscode-button-hoverBackground);
}
</style>
