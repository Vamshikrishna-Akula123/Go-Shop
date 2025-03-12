import { createSlice } from "@reduxjs/toolkit";


const CartSlice = createSlice({
    name: 'Cart',
    initialState:{
        Items: [],
        ItemsCount: 0
    },
    reducers: {
        addToCart: (state, action)=>{
            state.Items.push(action.payload);
            state.ItemsCount = state.Items.length;
        }
    }
}) 

export const {addToCart} = CartSlice.actions;
export default CartSlice.reducer;