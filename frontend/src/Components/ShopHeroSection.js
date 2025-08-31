import React from 'react'

export default function ShopHeroSection() {
  return (
    <div>
     <div className="container py-md-1">
        <div className='row '>
            <div className='col-sm-7 d-flex flex-column justify-content-center'>
                <h4 className='hero-heading ubuntu-bold herosection-title'> <span className='primary-color ubuntu-bold'>SHOP THE TOP  </span> <br/> BRAND MATERIALS</h4>
                <p className='HeroPragraph mt-4 px-md-3 ubuntu-regular herosection-paragraph'>Get premium-quality tools and construction supplies, trusted by professionals.
                  Perfect for DIY projects or expert service support – all in one place.</p>
            </div>
             <div className='col-sm-5'>
                <img src="/Fypimgs/shopimg12.jpg"  style={{ width: '600px', height: '550px' }}   className="img-fluid kitchen-img" alt="Description" />
            </div>
        </div>
     </div>

    </div>
  )
}
