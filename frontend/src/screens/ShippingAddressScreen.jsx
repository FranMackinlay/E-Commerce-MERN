import React, { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps/CheckoutSteps';

export default function ShippingAddressScreen(props) {
  const userSignin = useSelector(state => state.userSignIn);
  const {userInfo} = userSignin
  if (!userInfo) {
    props.history.push('/signin');
  }
  const cart = useSelector(state => state.cart);
  const {shippingAddress} = cart;

  const [fullName, setFullName] = useState(shippingAddress.fullName);
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  console.log('shippingAddress', shippingAddress.fullName, shippingAddress.address, shippingAddress.city, shippingAddress.postalCode, shippingAddress.country);

  const dispatch = useDispatch();

  const submitHandler = e => {
    e?.preventDefault();
    dispatch(saveShippingAddress({fullName, address, city, postalCode, country}));
    props.history.push('/payment');
  }

  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form onSubmit={submitHandler} className="form">
        <div>
          <h1>
            Shipping address
          </h1>
        </div>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input value={fullName} type="text" name="fullName" id="fullName" placeholder="Full Name" onChange={e => setFullName(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input value={address} type="text" name="address" id="address" placeholder="Address" onChange={e => setAddress(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input value={city} type="text" name="city" id="city" placeholder="City" onChange={e => setCity(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input value={postalCode} type="number" name="postalCode" id="postalCode" placeholder="Postal Code" onChange={e => setPostalCode(e.target.value)} required/>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input value={country} type="text" name="country" id="country" placeholder="Country" onChange={e => setCountry(e.target.value)} required/>
        </div>
        <div>
          <label/>
          <button type="submit" className="primary">Continue</button>
        </div>
      </form>
    </div>
  )
}
