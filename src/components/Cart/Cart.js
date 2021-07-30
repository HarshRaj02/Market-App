import { useState } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';

import Checkout from './Checkout';


import {cartActions} from '../../redux-store/index'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



const Cart = (props) => {



  const cartItemsStore =  useSelector(state => state.items);
 
  const cartTotalAmountPrice = useSelector(state => state.totalAmount);
  console.log(cartTotalAmountPrice);

  const isModalVisible = useSelector(state=> state.isModalVisible);

  

  const dispatch = useDispatch();
  const [isCheckout, setCheckout] = useState(false);


  //adding a comment here
  const hasItems = cartItemsStore.length > 0;
  const cartTotalAmount = `$${cartTotalAmountPrice.toFixed(2)}`

  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const cartItemAddHandler = (item) => {
   dispatch(cartActions.addItemToCartOnce(item));
  };

  const orderHandler = () =>
   {
     setCheckout(true);
   }

  const onSubmitHandler =  (userData) => {

    fetch('https://market-app-43d47-default-rtdb.firebaseio.com/orders.json',{
      method:'POST',
      body : JSON.stringify({
        user:userData,
        orderedItems : cartItemsStore
      })
    }).then(response => {
      console.log(response);
      if(response.status===200)
        alert("Order placed successfully!");
      
      else
        alert("Something went wrong!");
    });



  

  }
  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartItemsStore.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
      </div>
  );
 

 
  return (
    <div>
   
    <Modal id = "CartModal" onClose={props.onClose} > 
    {cartItems}
    <div className={classes.total}>
      <span>Total Amount</span>
      
      <span>{cartTotalAmount}</span>
    </div>
    {isCheckout  && <Checkout onConfirm = {onSubmitHandler} onCancel = {props.onClose}/>}
    {!isCheckout && modalActions}
    
  </Modal>
  </div>
   
  );
};

export default Cart;
