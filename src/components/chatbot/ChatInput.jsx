import { useState } from 'react'
import { Chatbot } from '@abubakardev1/chatbot';
import { ClipLoader } from "react-spinners";
import './ChatInput.css';

export function ChatInput({ chatMessages, setChatMessages }) {
  const [inputText, setInputText] = useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    const newChatMessages = [
      ...chatMessages,
      {
        message: inputText,
        sender: 'user',
        id: crypto.randomUUID()
      }
    ];


    setChatMessages([
      ...newChatMessages,
      // This creates a temporary Loading... message.
      // Because we don't save this message in newChatMessages,
      // it will be removed later, when we add the response.
      {
        message: <ClipLoader size={20} />,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    // Add a delay so the loading spinner is visible
    await new Promise(resolve => setTimeout(resolve, 1000));

    const response = Chatbot.getResponse(inputText);
    setChatMessages([
      ...newChatMessages,
      {
        message: response,
        sender: 'robot',
        id: crypto.randomUUID()
      }
    ]);

    setInputText('');
  }

  return (
    <div className="chat-input-container">
      <input
        placeholder="Send a message to Chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        className="chat-input"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            sendMessage();
          }
        }}
      />
      <button
        onClick={sendMessage}
        className="send-button"
      >Send</button>
    </div>
  );
}