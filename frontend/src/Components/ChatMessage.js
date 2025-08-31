// import React from 'react'
// import ChatbotIcon from './ChatbotIcon'

// export default function ChatMessage({chat}) {
//   return (
//      <div className={`message ${chat.role === `model`? `bot`:`user`}-message`}>
//          {chat.role === `model`&& <ChatbotIcon/>}                    
//          <p className='message-text px-3 py-3 rounded'>
//              {chat.text}
//          </p>
//     </div>
//   )
// }


// test code

import React from 'react'
import ChatbotIcon from './ChatbotIcon'

export default function ChatMessage({chat}) {
  return (
     <div className={`message ${chat.role === "model" ? "bot" : "user"}-message`}>
         {chat.role === "model" && <ChatbotIcon/>}                    
         <p className='message-text px-3 py-3 rounded'>
             {chat.text}
         </p>
    </div>
  )
}