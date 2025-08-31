import React from 'react'
import Sidebar from '../Components/Sidebar'
import Ordershow from '../Components/Ordershow'


export default function OrdersPage() {
  return (
    <div className='container-fluid'>
        
      <div className='row'>
        <Sidebar/>
        <Ordershow/>
      </div>
       
       
      
    </div>
  )
}


// test code -------------------------------------------------------------------------------------------
