import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCESS } from '../constants/userConstant'
import UsersSrv from '../services/UsersSrv';

export const signin = (email, password) => async dispatch => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });

  try {
    const { data } = await UsersSrv.userSignIn(email, password);
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
}

export const signOut = () => async dispatch => {
  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
  dispatch({
    type: USER_SIGNIN_SIGNOUT,
  })
}
