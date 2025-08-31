// // import React, { useState } from 'react'
// // import ChatbotIcon from './ChatbotIcon'
// // import { MdKeyboardArrowDown } from "react-icons/md";
// // import Navbar from './Navbar';
// // import ChatbotForm from './ChatbotForm';
// // import ChatMessage from './ChatMessage';

// // export default function Chatbot() {
// //   const [chatHistory, setChatHistory] = useState([]);
  
// //   const generateBotResponse = async(history) =>{
// //     const updateHistory = (text)=>{
// //       setChatHistory(prev=>[...prev.filter(msg=> msg.text !== "Thinking..."), {role:"model", text}])
// //     }

// //     // format chatHistory for api request
// //     history = history.map(({role, text})=>({role, parts:[{text}]}));
// //     const requestOptions = {
// //       method: "POST",
// //       headers:{"Content-Type": "application/json"},
// //       body: JSON.stringify({contents: history})
// //     }

// //     try{
// //       // make api call to get the bot response
// //       const response = await fetch(import.meta.env.BOT_API_URL, requestOptions);
// //       const data = await response.json();
// //       if(!response.ok) throw new Error(data.error.message || "something went wrong!")
// //       const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "`$1").trim();
// //       updateHistory(apiResponseText);


// //     } catch(error){
// //       console.log(error);
// //     }
// //   }
// //   return (
// //     <>
// //     <Navbar firstName="GB-Home-" lastName="Services"/>
// //     <div className='container-fluid chatbot-bg'>
// //     <div className='contianer inte'>
// //         <div className='chatbot-popup'>
// //             {/* chatbot header */}
// //             <div className='chatbot-header'>
// //                 <div className='header-info'>
// //                     <ChatbotIcon/>
// //                     <h2 className='logo-text'>Chatbot</h2>
// //                 </div>
// //                 <button className="d-flex justify-content-center align-items-center p-0 border-0 "><MdKeyboardArrowDown className='fs-1' /></button>
// //             </div>
// //             {/* chatbot body */}
// //            <div className='chatbot-body'>
// //                     <div className='message bot-message'>
// //                             <ChatbotIcon/>
// //                             <p className='message-text px-3 py-3 rounded'>
// //                                 Hey there 👋 <br/> How can I help you today?
// //                             </p>
// //                     </div>
// //                     {/* // render the chat history dynamically */}
// //                     {chatHistory.map((chat, index)=>(
// //                         <ChatMessage key="index" chat={chat}/>
// //                     ))}
                      
      
                   
// //             </div>
// //               {/* chatbot footer */}

// //               <div className='chatbot-footer px-3 py-3'>
// //                 <ChatbotForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
// //               </div>
// //         </div>
// //     </div>
// //     </div>
// //     </>
// //   )
// // }




// // test code 
// import React, { useState } from 'react'
// import ChatbotIcon from './ChatbotIcon'
// import { MdKeyboardArrowDown } from "react-icons/md";
// import Navbar from './Navbar';
// import ChatbotForm from './ChatbotForm';
// import ChatMessage from './ChatMessage';

// export default function Chatbot() {
//   const [chatHistory, setChatHistory] = useState([]);
  
//   const generateBotResponse = async(history) =>{
//     const updateHistory = (text)=>{
//       setChatHistory(prev=>[...prev.filter(msg=> msg.text !== "Thinking..."), {role:"model", text}])
//     }

//     // format chatHistory for api request
//     const formattedHistory = history.map(({role, text})=>({role, parts:[{text}]}));
//     const requestOptions = {
//       method: "POST",
//       headers:{"Content-Type": "application/json"},
//       body: JSON.stringify({contents: formattedHistory})
//     }

//     try{
//       // FIX: Use correct environment variable access method
//       const apiUrl = process.env.BOT_API_URL || import.meta.env?.BOT_API_URL;
//       if (!apiUrl) throw new Error("API URL not configured");
      
//       // make api call to get the bot response
//       const response = await fetch(apiUrl, requestOptions);
//       const data = await response.json();
      
//       if(!response.ok) throw new Error(data.error?.message || "something went wrong!");
      
//       // FIX: Added optional chaining for safer property access
//       const apiResponseText = data.candidates?.[0]?.content?.parts?.[0]?.text?.replace(/\*\*(.*?)\*\*/g, "`$1").trim() || "Sorry, I couldn't process that response.";
//       updateHistory(apiResponseText);
      

//     } catch(error){
//       console.error("API Error:", error);
//       // Add error message to chat
//       setChatHistory(prev=>[...prev.filter(msg=> msg.text !== "Thinking..."), 
//         {role:"model", text: "Sorry, I'm having trouble responding right now."}
//       ]);
//     }
//   }
  
//   return (
//     <>
//     <Navbar firstName="GB-Home-" lastName="Services"/>
//     <div className='container-fluid chatbot-bg'>
//     {/* FIX: Corrected 'contianer' to 'container' */}
//     <div className='container inte'>
//         <div className='chatbot-popup'>
//             {/* chatbot header */}
//             <div className='chatbot-header'>
//                 <div className='header-info'>
//                     <ChatbotIcon/>
//                     <h2 className='logo-text'>Chatbot</h2>
//                 </div>
//                 <button className="d-flex justify-content-center align-items-center p-0 border-0 "><MdKeyboardArrowDown className='fs-1' /></button>
//             </div>
//             {/* chatbot body */}
//            <div className='chatbot-body'>
//                     <div className='message bot-message'>
//                             <ChatbotIcon/>
//                             <p className='message-text px-3 py-3 rounded'>
//                                 Hey there 👋 <br/> How can I help you today?
//                             </p>
//                     </div>
//                     {/* FIX: Use index properly for key */}
//                     {chatHistory.map((chat, index)=>(
//                         <ChatMessage key={index} chat={chat}/>
//                     ))}
//             </div>
//               {/* chatbot footer */}

//               <div className='chatbot-footer px-3 py-3'>
//                 <ChatbotForm chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
//               </div>
//         </div>
//     </div>
//     </div>
//     </>
//   )
// }

// final test
// import React, { useState } from 'react';
// import ChatbotIcon from './ChatbotIcon';
// import { MdKeyboardArrowDown } from "react-icons/md";
// import Navbar from './Navbar';
// import ChatbotForm from './ChatbotForm';
// import ChatMessage from './ChatMessage';

// export default function Chatbot() {
//   const [chatHistory, setChatHistory] = useState([]);
  
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
//       // FIX: Consolidated environment variable access
//       let apiUrl = "";
      
//       // Check for Vite environment (import.meta.env)
//       if (typeof import.meta !== 'undefined' && import.meta.env) {
//         apiUrl = import.meta.env.VITE_BOT_API_URL || import.meta.env.BOT_API_URL;
//       } 
//       // Check for Node environment (process.env)
//       else if (typeof process !== 'undefined' && process.env) {
//         apiUrl = process.env.REACT_APP_BOT_API_URL || process.env.BOT_API_URL;
//       }
      
//       if (!apiUrl) throw new Error("API URL not configured");
      
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
//         {role: "model", text: "Sorry, I'm having trouble responding right now. Please check your API configuration."}
//       ]);
//     }
//   }
  
//   return (
//     <>
//       <Navbar firstName="GB-Home-" lastName="Services"/>
//       <div className='container-fluid chatbot-bg'>
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
//             <div className='chatbot-body'>
//               <div className='message bot-message'>
//                 <ChatbotIcon/>
//                 <p className='message-text px-3 py-3 rounded'>
//                   Hey there 👋 <br/> How can I help you today?
//                 </p>
//               </div>
              
//               {/* FIX: Use unique index for key prop */}
//               {chatHistory.map((chat, index) => (
//                 <ChatMessage key={`${index}-${chat.role}`} chat={chat}/>
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

// final test


import React, { useState } from 'react';
import ChatbotIcon from './ChatbotIcon';
import { MdKeyboardArrowDown } from "react-icons/md";
import Navbar from './Navbar';
import ChatbotForm from './ChatbotForm';
import ChatMessage from './ChatMessage';

export default function Chatbot() {
  const [chatHistory, setChatHistory] = useState([]);
  
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
  
  return (
    <>
      <Navbar firstName="GB-Home-" lastName="Services"/>
      <div className='container-fluid chatbot-bg'>
        {/* FIX: Corrected 'contianer' to 'container' */}
        <div className='container inte'>
          <div className='chatbot-popup'>
            {/* Chatbot header */}
            <div className='chatbot-header'>
              <div className='header-info'>
                <ChatbotIcon/>
                <h2 className='logo-text'>Chatbot</h2>
              </div>
              <button className="d-flex justify-content-center align-items-center p-0 border-0 ">
                <MdKeyboardArrowDown className='fs-1' />
              </button>
            </div>
            
            {/* Chatbot body */}
            <div className='chatbot-body'>
              <div className='message bot-message'>
                <ChatbotIcon/>
                <p className='message-text px-3 py-3 rounded'>
                  Hey there 👋 <br/> How can I help you today?
                </p>
              </div>
              
              {/* FIX: Use unique index for key prop */}
              {chatHistory.map((chat, index) => (
                <ChatMessage key={`${index}-${chat.role}-${chat.text.substring(0, 10)}`} chat={chat}/>
              ))}
            </div>
            
            {/* Chatbot footer */}
            <div className='chatbot-footer px-3 py-3'>
              <ChatbotForm 
                chatHistory={chatHistory} 
                setChatHistory={setChatHistory} 
                generateBotResponse={generateBotResponse}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}