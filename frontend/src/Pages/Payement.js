import React from 'react'
import Sidebar from '../Components/Sidebar'
import EasyPaisaPayment from '../Components/EasyPaisaPayment'


export default function Payemnt() {
  return (
    <div className='container-fluid'>
        
      <div className='row'>
        <Sidebar/>
        <EasyPaisaPayment/>
      </div>
       
       
      
    </div>
  )
}