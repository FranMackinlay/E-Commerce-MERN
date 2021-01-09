import { CART_ADD_ITEM } from '../constants/cartConstant';
import ProductsSrv from '../services/ProductsSrv'



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
}
