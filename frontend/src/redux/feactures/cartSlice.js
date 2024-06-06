import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): [],
  shippingInfo:localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')): {}
};
export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    setCartItem(state, action) {
      const item = action.payload;
      // if item already exist in cart
      const isExist = state.cartItems.find((i) => i.product === item.product);
      console.log("isExist", isExist);
      if (isExist) {
        // if it exist check in cartItems array & replace it
        state.cartItems = state.cartItems.map((i) =>
          i.product === isExist.product ? item : i
        );
      } else {

        state.cartItems = [...state.cartItems, item];
      }
      localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    removeCartItem(state,action){
        state.cartItems=state.cartItems.filter((i)=>i.product !==action.payload)
        localStorage.setItem('cartItems',JSON.stringify(state.cartItems))
    },
    clearCartItem(state,action){
     
      localStorage.removeItem('cartItems')
      state.cartItems=[];
  },
    setShippingInfo(state,action){
state.shippingInfo=action.payload;
localStorage.setItem('shippingInfo',JSON.stringify(state.shippingInfo))
    }
  },
});
export default cartSlice.reducer;
export const { setCartItem,removeCartItem,setShippingInfo,clearCartItem } = cartSlice.actions;

// setCartItem(state, action) {
//     const item = action.payload;
//     const index = state.cartItems.findIndex(i => i.product === item.product);

//     if (index !== -1) {
//       // Item already exists in cart, update it
//       state.cartItems[index] = item;
//     } else {
//       // Item doesn't exist in cart, add it
//       state.cartItems.push(item);
//     }
//   }
