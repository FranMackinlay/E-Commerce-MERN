import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstant';
import ProductsSrv from '../services/ProductsSrv';



export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const product = await ProductsSrv.getProductDetails(productId);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      product: product._id,
      qty,
    }
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = productId => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = data => dispatch => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = data => dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD, payload: data
  });
};
