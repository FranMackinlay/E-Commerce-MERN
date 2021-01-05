import { PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS } from '../constants/productConstant'
import ProductsSrv from '../services/ProductsSrv';

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });

  try {
    const products = await ProductsSrv.getProducts();
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });

  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
}
