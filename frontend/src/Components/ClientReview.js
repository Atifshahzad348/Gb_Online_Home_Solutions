import React from 'react'
import { FaCircleUser } from "react-icons/fa6";

export default function ClientReview(props) {
  return (
    <div className='rounded-lg'>
     <div className="card h-100 shadow-lg CR-border" >
        <div className="card-body">
          <div className='container-fluid d-flex justify-content-between'>
           <div className=''><FaCircleUser style={{ fontSize: '32px', color: 'orange' }} className='me-2 mb-2' /><h7 className="card-title">{props.ClientName}</h7></div>
           {/* <div><h6 className="card-title">{props.ClientName}</h6></div> */}
          </div>
           {/* <p className='ps-3'>{props.ClientAdress}</p> */}
           <p className='px-3'>{props.ClientMsg}</p>
        </div>
     </div>
    </div>
  )
}
