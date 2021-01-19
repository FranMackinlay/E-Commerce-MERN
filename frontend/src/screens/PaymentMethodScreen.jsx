import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';

const PaymentMethodScreen = props => {
  const [paymentMethod, setPaymentMethod] = useState('PayPal');
  const dispatch = useDispatch();

  const submitHandler = e => {
    e?.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push('/placeorder')

  }
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form action="" className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input type="radio" id="paypal" value="PayPal" name="paymentMethod" requred checked onChange={e => setPaymentMethod(e.target.value)}/>
            <label htmlFor="paypal">Paypal</label>
          </div>
        </div>

        <div>
          <div>
            <input type="radio" id="stripe" value="Stripe" name="paymentMethod" requred onChange={e => setPaymentMethod(e.target.value)}/>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <button type="submit" className="primary">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentMethodScreen;
