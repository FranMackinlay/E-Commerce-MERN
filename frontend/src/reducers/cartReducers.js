import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstant';

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

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.product !== action.payload),
      };

    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload
      };
    default:
      return state;
  }
};
