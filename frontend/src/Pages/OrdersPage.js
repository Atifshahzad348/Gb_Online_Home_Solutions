import React from 'react'
import Sidebar from '../Components/Sidebar'
// import Ordershow from '../Components/Ordershow'
import CartOrders from '../Components/CartOrders'


export default function OrdersPage() {
  return (
    <div className='container-fluid'>
        
      <div className='row'>
        <Sidebar/>
        <CartOrders/>
        {/* <Ordershow/> */}
      </div>
       
       
      
    </div>
  )
}


// test code -------------------------------------------------------------------------------------------
