import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';


const initialState = { items : [], totalAmount : 0 , totalQuantity: 0};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers : {

        addItemToCart(state,action) {

        const newItem = action.payload;

       
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === newItem.id
          );

        const existingCartItem = state.items[existingCartItemIndex]; 
       
        
       
       


        if(!existingCartItem) {
           
            state.items.push(newItem);
            state.totalAmount = state.totalAmount + newItem.amount*newItem.price;
           
        } else
         {
            
             state.totalAmount = state.totalAmount + existingCartItem.price;
             state.items[existingCartItemIndex].amount = state.items[existingCartItemIndex].amount + newItem.amount;
         }


        state.totalQuantity = state.items.reduce((curNumber, item) => {
            return curNumber + item.amount;
          }, 0);


        },


        removeItemFromCart(state,action) {

            const id = action.payload;
   

            const existingItem = state.items.find((item) => item.id === id);
            state.totalAmount = state.totalAmount - existingItem.price;
           
            if(existingItem.amount === 1) {
                state.items = state.items.filter((item)=> item.id !==  id);
            }
            else
             {
                 existingItem.amount--;
             }

             state.totalQuantity = state.items.reduce((curNumber, item) => {
                return curNumber + item.amount;
              }, 0);
        
        },

        makeCartItemsZero(state) {
            state.totalQuantity=0;
            state.items = [];
            state.totalAmount = 0;

          },

        addItemToCartOnce(state,action) {
            const newItem = action.payload;

       
            const existingCartItemIndex = state.items.findIndex(
                (item) => item.id === newItem.id
            );

     
             state.totalAmount = state.totalAmount + state.items[existingCartItemIndex].price;
             state.items[existingCartItemIndex].amount = state.items[existingCartItemIndex].amount + 1;
         


            state.totalQuantity = state.items.reduce((curNumber, item) => {
                return curNumber + item.amount;
            }, 0);
        }  

    }
});



const store = createStore(cartSlice.reducer);
export default store;

export const cartActions = cartSlice.actions;


