import { USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SIGNOUT, USER_SIGNIN_SUCCESS, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_FAIL, USER_DETAILS_SUCCESS, USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS } from '../constants/userConstant'
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
  localStorage.removeItem('shippingAddress');
  dispatch({
    type: USER_SIGNIN_SIGNOUT,
  })
}

export const register = (name, email, password) => async dispatch => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });

  try {
    const { data } = await UsersSrv.register(name, email, password);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const userDetails = userId => async (dispatch, getState) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });

  const { userSignIn: { userInfo } } = getState();


  try {
    const user = await UsersSrv.getUserDetails(userInfo);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: user });

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({ type: USER_DETAILS_FAIL, payload: message });

  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

  const { userSignIn: { userInfo } } = getState();

  try {

    const updatedUser = await UsersSrv.upsertUserDetails(user, userInfo);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: updatedUser });

    dispatch({ type: USER_SIGNIN_SUCCESS, payload: updatedUser });

    localStorage.setItem('userInfo', JSON.stringify(updatedUser));

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }

}

