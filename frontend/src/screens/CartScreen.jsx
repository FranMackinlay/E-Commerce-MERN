import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox/MessageBox';

export default function CartScreen(props) {
  const productId = props.match.params.id;

  const qty = props.location.search ? Number(props.location.search.split('=')[1]) : 1;

  const cart = useSelector(state => state.cart);

  const {cartItems} = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);


  const removeFromCartHandler = productId => {
    dispatch(removeFromCart(productId));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
   <div className="row top">
    <div className="col-2">
      <h1>
        Shopping Cart
      </h1>
      {!cartItems.length ?
      <MessageBox>
        Cart is empty. <Link to="/"> Go Shopping</Link>
      </MessageBox>
      :
      (
        <ul>
          {cartItems.map(item => (
            <li key={item.product}>
              <div className="row">
                <div>
                  <img src={item.image} alt={item.name} className="small"/>
                </div>

                <div className="min-30">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </div>
                <div>
                  <select
                    value={item.qty}
                    onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                    {
                      [...Array(item.countInStock).keys()].map(count => {
                        const realCount = count + 1;
                        return <option key={realCount} value={realCount}>{ realCount }</option>
                      })
                    }
                  </select>
                </div>
                <div>
                  ${item.price}
                </div>
                <div>
                  <button type="button" onClick={() => removeFromCartHandler(item.product)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )
      }
    </div>
    <div className="col-1">
      <div className="card card-body">
        <ul>
          <li>
            <h2>
              Subtotal ({cartItems.reduce((accum, currItem) => accum + currItem.qty, 0)} items):
              ${cartItems.reduce((accum, currItem) => accum + currItem.price * currItem.qty, 0)}
            </h2>
          </li>
          <li>
            <button type="button" onClick={e => checkoutHandler()} className="primary block" disabled={!cartItems.length}>
              Proceed to Checkout
            </button>
            <Link to="/">
              <button type="button" className="primary block">
                Continue shopping
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
   </div>
  )
}
