import { CART_ADD_ITEM } from '../constants/cartConstant';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const newProduct = action.payload;
      const itemExists = state.cartItems.find(item => item.product === newProduct.product);

      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map(item => item.product === newProduct.product ? newProduct : item),
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            newProduct
          ],
        };
      }
    default:
      return state;
  }
}
