// import React, { useRef } from 'react'
// import { FaArrowUp } from "react-icons/fa";

// export default function ChatbotForm({chatHistory, setChatHistory, generateBotResponse}) {
//     const inputRef = useRef();
//     const handleFormSubmit =(e)=>{
//         e.preventDefault();
//         const userMessage = inputRef.current.value.trim();
//         if(!userMessage)  return;
//         inputRef.current.value = ""

       
//         // update the hitory wiht the user message
//         setChatHistory(history=>[...history, {role: "user", text: "userMessage"}]);


   
//     setTimeout(() => {
//      setChatHistory(history => [...history, {role: "model", text: "Thinking..."}]);
//      generateBotResponse([...chatHistory, {role: "user", text: userMessage}]);
//      }, 600);
//     }
//   return (

//       <form action='#' className='chatbot-form' onSubmit={handleFormSubmit}>
//          <input ref={inputRef} type='text' placeholder='Message...' className='message-input' required ></input>
//          <button ><FaArrowUp /></button>
//     </form>
    
//   )
// }

// test code

// import React, { useRef } from 'react'
// import { FaArrowUp } from "react-icons/fa";

// export default function ChatbotForm({chatHistory, setChatHistory, generateBotResponse}) {
//     const inputRef = useRef();
    
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const userMessage = inputRef.current.value.trim();
//         if(!userMessage) return;
        
//         inputRef.current.value = "";

//         // FIX: Use functional update and correct variable reference
//         setChatHistory(prevHistory => [...prevHistory, 
//             {role: "user", text: userMessage} // Removed quotes around userMessage
//         ]);

//         setTimeout(() => {
//             // Add thinking message and generate response with latest state
//             setChatHistory(prevHistory => [...prevHistory, 
//                 {role: "model", text: "Thinking..."}
//             ]);
            
//             // Pass the updated history to generateBotResponse
//             generateBotResponse([...chatHistory, {role: "user", text: userMessage}]);
//         }, 600);
//     }

//     return (
//         <form className='chatbot-form' onSubmit={handleFormSubmit}>
//             <input 
//                 ref={inputRef} 
//                 type='text' 
//                 placeholder='Message...' 
//                 className='message-input' 
//                 required 
//             />
//             <button type="submit">
//                 <FaArrowUp />
//             </button>
//         </form>
//     )
// }


// final test

// import React, { useRef } from 'react';
// import { FaArrowUp } from "react-icons/fa";

// export default function ChatbotForm({chatHistory, setChatHistory, generateBotResponse}) {
//     const inputRef = useRef();
    
//     const handleFormSubmit = (e) => {
//         e.preventDefault();
//         const userMessage = inputRef.current.value.trim();
//         if(!userMessage) return;
        
//         inputRef.current.value = "";

//         // FIX: Use functional update for immediate state change
//         setChatHistory(prevHistory => {
//           const updatedHistory = [...prevHistory, {role: "user", text: userMessage}];
          
//           // Add thinking message after state update
//           setTimeout(() => {
//             setChatHistory(prev => [...prev, {role: "model", text: "Thinking..."}]);
            
//             // Pass the updated history to generateBotResponse
//             generateBotResponse(updatedHistory);
//           }, 100);
          
//           return updatedHistory;
//         });
//     }

//     return (
//         <form className='chatbot-form' onSubmit={handleFormSubmit}>
//             <input 
//                 ref={inputRef} 
//                 type='text' 
//                 placeholder='Message...' 
//                 className='message-input' 
//                 required 
//             />
//             <button type="submit">
//                 <FaArrowUp />
//             </button>
//         </form>
//     );
// }

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
        <form className='chatbot-form' onSubmit={handleFormSubmit}>
            <input 
                ref={inputRef} 
                type='text' 
                placeholder='Message...' 
                className='message-input' 
                required 
            />
            <button type="submit">
                <FaArrowUp />
            </button>
        </form>
    );
}