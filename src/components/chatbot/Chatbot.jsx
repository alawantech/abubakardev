import { useState } from 'react'
import { ChatInput } from './ChatInput';
import ChatMessages from './ChatMessages';
import './Chatbot.css'

export default function Chatbot() {
    const [chatMessages, setChatMessages] = useState([]);
    // const [chatMessages, setChatMessages] = array;
    // const chatMessages = array[0];
    // const setChatMessages = array[1];

    return (
        <div className="app-container">
            <ChatMessages
                chatMessages={chatMessages}
            />
            <ChatInput
                chatMessages={chatMessages}
                setChatMessages={setChatMessages}
            />
        </div>
    );
}
