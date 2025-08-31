import React from 'react';



const propTypes = {};

const defaultProps = {};

/**
 * 
 */
const OrderForm = (props) => {
    
    
    return <>
    <div>
    <form action="" className='bg-black text-white py-5 px-4 rounded-3'>
                    <h2 className='sc-color text-center fw-bold'>Please Fill the Form below</h2>
                    <h5>You will recive a call in few minutes to guide you regarding your query.</h5>
                    <input type="text" placeholder='Name'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <input type="text" placeholder='03xxxxxxxx'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <input type="text" placeholder='City'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <input type="text" placeholder='Address'  className="order-form-input w-100 form-control me-2 p-2 mb-md-0 mb-3 border mt-3"/>
                    <label htmlFor="" className="fw-bold"><br />Choose Your Service Type</label>
                    <div className='d-flex justify-content-between mt-3'>
                    <div className='border border-rounde radio-btn'>
                           <label htmlFor="" className="fw-bold"><input type="radio" name='actype' />   <br />{props.opt1}</label>
                   </div>
                        <div className='border border-rounde radio-btn'>
                        <label htmlFor="" className="fw-bold"><input type="radio" name='actype' /> <br />{props.opt2}</label>
                        </div>
                    </div>
                    <div>
                    <label htmlFor="" className="fw-bold"><br />Explain your problem (optional)</label>
                    <textarea class="form-control mt-md-3"  id="exampleFormControlTextarea1" rows="5">hello</textarea>
                    
                    </div>
                    <button className='btn order-form-btn fw-bold w-100 mt-3'>Confirm Order</button>
                </form>
    </div>
    </>;
}

OrderForm.propTypes = propTypes;
OrderForm.defaultProps = defaultProps;
// #endregion

export default OrderForm;