import React, { useEffect, useState } from 'react'
import { PayPalButton } from 'react-paypal-button-v2';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox/LoadingBox';
import MessageBox from '../components/MessageBox/MessageBox';
import PaypalSrv from '../services/PaypalSrv';

export default function OrderScreen(props) {

  const orderId = props.match.params.id;
  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector(state => state.orderDetails);
  const {order, loading, error} = orderDetails;


  const dispatch = useDispatch();

  useEffect(() => {
    const addPaypalScript = async () => {
      const clientId = await PaypalSrv.getClientId();
      console.log('CLIENTID', clientId);
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    }
    if (!order) return dispatch(detailsOrder(orderId));

    if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, sdkReady])

  const successPaymentHandler = () => {
    // dispatch pay order
  };

  return loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger"></MessageBox>) : (
    <div>
      <h1>Order: #{order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br/><br/>
                  <strong>Address: </strong> {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}.
                </p>
                <br/>
                {order.flags.isDelivered ? (<MessageBox variant="success">Delivered at {order.flags.deliveredAt}</MessageBox>) : (<MessageBox variant="danger">Not Delivered</MessageBox>)}
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                <br/>
                {order.flags.isPaid ? (<MessageBox variant="success">Paid at {order.flags.paidAt}</MessageBox>) : (<MessageBox variant="danger">Not Paid</MessageBox>)}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map(item => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img src={item.image} alt={item.name} className="small"/>
                        </div>

                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = {item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong>
                      Order total
                    </strong>
                  </div>
                  <div>
                    <strong>
                      ${order.totalPrice.toFixed(2)}
                    </strong>
                  </div>
                </div>
              </li>
              {!order.isPaid && (
                <li>
                  {!sdkReady ? (<LoadingBox></LoadingBox>) : (<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}></PayPalButton>)}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
