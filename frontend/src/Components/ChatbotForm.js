
import React, { useRef } from 'react';
import { FaArrowUp } from "react-icons/fa";

export default function ChatbotForm({chatHistory, setChatHistory, generateBotResponse}) {
    const inputRef = useRef();
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if(!userMessage) return;
        
        inputRef.current.value = "";

        // Add user message immediately
        const newHistoryWithUser = [...chatHistory, {role: "user", text: userMessage}];
        setChatHistory(newHistoryWithUser);
        
        // Add thinking message and generate response
        setTimeout(() => {
          setChatHistory(prev => [...prev, {role: "model", text: "Thinking..."}]);
          generateBotResponse(newHistoryWithUser);
        }, 100);
    }

    return (
        <form className='chatbot-form d-flex align-items-center' onSubmit={handleFormSubmit}>
            <input 
                ref={inputRef} 
                type='text' 
                placeholder='Message...' 
                className='message-input border-0' 
                required 
            />
            <button type="submit" className="d-flex align-items-center justify-content-center">
                <FaArrowUp />
            </button>
        </form>
    );
}