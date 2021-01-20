import { CART_EMPTY } from '../constants/cartConstant';
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL } from '../constants/orderConstants'
import OrdersSrv from '../services/OrdersSrv';

export const createOrder = order => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST, payload: order });

  try {
    const { userSignIn: { userInfo } } = getState();
    const data = await OrdersSrv.createOrder(order, userInfo);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data.order,
    });

    dispatch({
      type: CART_EMPTY,
    });

    localStorage.removeItem('cartItems');

  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  };
};

export const detailsOrder = orderId => async (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });

  const { userSignIn: { userInfo } } = getState();

  try {
    const data = await OrdersSrv.getOrderDetails(orderId, userInfo);

    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({ type: ORDER_DETAILS_FAIL, payload: message });
  }

};
