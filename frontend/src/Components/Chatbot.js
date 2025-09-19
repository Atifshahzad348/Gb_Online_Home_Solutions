 


// import React, { useEffect, useRef, useState } from 'react';
// import ChatbotIcon from './ChatbotIcon';
// import { MdKeyboardArrowDown } from "react-icons/md";
// import Navbar from './Navbar';
// import ChatbotForm from './ChatbotForm';
// import ChatMessage from './ChatMessage';

// export default function Chatbot() {
//   const [chatHistory, setChatHistory] = useState([]);
//   const chatBodyRef = useRef();

  
//   const generateBotResponse = async(history) => {
//     const updateHistory = (text) => {
//       setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), 
//         {role: "model", text}
//       ]);
//     }

//     // Format chatHistory for api request
//     const formattedHistory = history.map(({role, text}) => (
//       {role, parts: [{text}]}
//     ));
    
//     const requestOptions = {
//       method: "POST",
//       headers: {"Content-Type": "application/json"},
//       body: JSON.stringify({contents: formattedHistory})
//     }

//     try {
//       // FIX: Directly use Create React App environment variable
//       const apiUrl = process.env.REACT_APP_BOT_API_URL;
      
//       if (!apiUrl) {
//         throw new Error("API URL not configured. Please check your .env file and ensure REACT_APP_BOT_API_URL is set correctly.");
//       }
      
//       console.log("API URL:", apiUrl); // For debugging
      
//       // Make API call to get the bot response
//       const response = await fetch(apiUrl, requestOptions);
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data = await response.json();
      
//       // FIX: Added comprehensive optional chaining for API response
//       const apiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text
//         ?.replace(/\*\*(.*?)\*\*/g, "`$1")
//         .trim() || "Sorry, I couldn't process that response.";
      
//       updateHistory(apiResponseText);

//     } catch(error) {
//       console.error("API Error:", error);
//       // Add error message to chat
//       setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), 
//         {role: "model", text: `Sorry, I'm having trouble responding right now. Error: ${error.message}`}
//       ]);
//     }
//   }
//   useEffect(()=>{
//     // auto scrolll when chathistory is updateds
//     chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"})
//   }, [chatHistory])
//   return (
//     <>
//       <Navbar firstName="GB-Home-" lastName="Services"/>
//       <div className='container-fluid  chatbot-bg'>
//         {/* FIX: Corrected 'contianer' to 'container' */}
//         <div className='container inte'>
//           <div className='chatbot-popup'>
//             {/* Chatbot header */}
//             <div className='chatbot-header'>
//               <div className='header-info'>
//                 <ChatbotIcon/>
//                 <h2 className='logo-text'>Chatbot</h2>
//               </div>
//               <button className="d-flex justify-content-center align-items-center p-0 border-0 ">
//                 <MdKeyboardArrowDown className='fs-1' />
//               </button>
//             </div>
            
//             {/* Chatbot body */}
//             <div ref={chatBodyRef} className='chatbot-body'>
//               <div className='message bot-message'>
//                 <ChatbotIcon/>
//                 <p className='message-text px-3 py-3 rounded'>
//                   Hey there 👋 <br/> How can I help you today?
//                 </p>
//               </div>
              
//               {/* FIX: Use unique index for key prop */}
//               {chatHistory.map((chat, index) => (
//                 <ChatMessage key={`${index}-${chat.role}-${chat.text.substring(0, 10)}`} chat={chat}/>
//               ))}
//             </div>
            
//             {/* Chatbot footer */}
//             <div className='chatbot-footer px-3 py-3'>
//               <ChatbotForm 
//                 chatHistory={chatHistory} 
//                 setChatHistory={setChatHistory} 
//                 generateBotResponse={generateBotResponse}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// test code
import React, { useEffect, useRef, useState } from 'react';
import ChatbotIcon from './ChatbotIcon';
import { MdKeyboardArrowDown } from "react-icons/md";
import Navbar from './Navbar';
import ChatbotForm from './ChatbotForm';
import ChatMessage from './ChatMessage';

export default function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  const chatBodyRef = useRef();

  const generateBotResponse = async(history) => {
    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), 
        {role: "model", text}
      ]);
    }

    // Format chatHistory for api request
    const formattedHistory = history.map(({role, text}) => (
      {role, parts: [{text}]}
    ));
    
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({contents: formattedHistory})
    }

    try {
      // FIX: Directly use Create React App environment variable
      const apiUrl = process.env.REACT_APP_BOT_API_URL;
      
      if (!apiUrl) {
        throw new Error("API URL not configured. Please check your .env file and ensure REACT_APP_BOT_API_URL is set correctly.");
      }
      
      console.log("API URL:", apiUrl); // For debugging
      
      // Make API call to get the bot response
      const response = await fetch(apiUrl, requestOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // FIX: Added comprehensive optional chaining for API response
      const apiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text
        ?.replace(/\*\*(.*?)\*\*/g, "`$1")
        .trim() || "Sorry, I couldn't process that response.";
      
      updateHistory(apiResponseText);

    } catch(error) {
      console.error("API Error:", error);
      // Add error message to chat
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), 
        {role: "model", text: `Sorry, I'm having trouble responding right now. Error: ${error.message}`}
      ]);
    }
  }
  
  useEffect(()=>{
    // auto scroll when chathistory is updated
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"})
  }, [chatHistory])
  
  return (
    <>
      <Navbar firstName="GB-Home-" lastName="Services"/>
      <div className='container-fluid chatbot-bg d-flex align-items-center justify-content-center min-vh-100 py-3'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4'>
              <div className='chatbot-popup bg-light rounded shadow'>
                {/* Chatbot header */}
                <div className='chatbot-header d-flex align-items-center justify-content-between p-3'>
                  <div className='header-info d-flex align-items-center gap-2'>
                    <ChatbotIcon/>
                    <h2 className='logo-text mb-0'>Chatbot</h2>
                  </div>
                  <button className="btn btn-light rounded-circle d-flex justify-content-center align-items-center p-0" style={{width: '40px', height: '40px'}}>
                    <MdKeyboardArrowDown className='fs-3' />
                  </button>
                </div>
                
                {/* Chatbot body */}
                <div ref={chatBodyRef} className='chatbot-body p-3' style={{height: '450px', overflowY: 'auto'}}>
                  <div className='message bot-message d-flex gap-2 align-items-start mb-3'>
                    <ChatbotIcon/>
                    <p className='message-text px-3 py-2 rounded mb-0'>
                      Hey there 👋 <br/> How can I help you today?
                    </p>
                  </div>
                  
                  {/* FIX: Use unique index for key prop */}
                  {chatHistory.map((chat, index) => (
                    <ChatMessage key={`${index}-${chat.role}-${chat.text.substring(0, 10)}`} chat={chat}/>
                  ))}
                </div>
                
                {/* Chatbot footer */}
                <div className='chatbot-footer p-3'>
                  <ChatbotForm 
                    chatHistory={chatHistory} 
                    setChatHistory={setChatHistory} 
                    generateBotResponse={generateBotResponse}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}