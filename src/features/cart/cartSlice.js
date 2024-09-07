import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    cartItems:[],
    numItemsInCart:0,
    cartTotal:0,
    tax:0,
    orderTotal:0
}


const getCartFromLocalStorage=()=>{
    return JSON.parse(localStorage.getItem('cart')) || initialState;
}

const cartSlice = createSlice({
    name:'cart',
    initialState : getCartFromLocalStorage(),
    reducers:{
        addItem : (state,action)=>{
            const {item} = action.payload;
            state.cartItems.push(item);
            state.numItemsInCart += item.amount;
            state.cartTotal += item.price*item.amount;
            cartSlice.caseReducers.calculateTotals(state);
            alert("Item Added into cart");
        },
        calculateTotals:(state)=>{
            localStorage.setItem("cart",JSON.stringify(state));
        },
        removeItem:(state,action)=>{
            const cartId = action.payload;
            console.log("The value is ::  ",cartId);
            const cartData = state.cartItems.find(i=>i.cartId===cartId);
            state.cartItems = state.cartItems.filter(i=>i.cartId!==cartId);
            state.numItemsInCart-=cartData.amount;
            state.cartTotal-=cartData.price*cartData.amount;
            cartSlice.caseReducers.calculateTotals(state);
            alert("Item removed From Cart");
        }
    }
})

export default cartSlice.reducer;
export const {addItem,removeItem} = cartSlice.actions;