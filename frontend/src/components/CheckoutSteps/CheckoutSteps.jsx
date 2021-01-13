import React from 'react'

export default function CheckoutSteps(props) {

  return (
    <div className="row checkout-steps">
      <div className={`bold ${props.step1 ? 'active': ''}`}>Sign-In</div>
      <div className={`bold ${props.step2 ? 'active': ''}`}>Shipping</div>
      <div className={`bold ${props.step3 ? 'active': ''}`}>Payment</div>
      <div className={`bold ${props.step4 ? 'active': ''}`}>Place Order</div>
    </div>
  )
}
