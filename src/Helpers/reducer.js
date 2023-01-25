export const initialState = {
    cart: [],
    user: null
  };
  
  // Selector
  export const getCartTotal = (cart) => 
    cart?.reduce((amount, product) => product.price + amount, 0);
  
  const reducer = (state, action) => {
    console.log(action);
    switch (action.type) {
      case "ADD_TO_CART":
        return {
          ...state,
          cart: [...state.cart, action.product],
        };
      default:
        return state;
    }
  };
  
  export default reducer;