import classes from './Checkout.module.css';
import { useContext, useRef, useState } from 'react';
import CartContext from '../../store/cart-context';

const isEmpty = (item) => item === '';
const isFiveChars = (item) => item.length === 5 ;

const Checkout = (props) => {



  const [formValidity,setFormValidity] = useState({
    name:true,
    street: true,
    postal : true,
    city:true
  })

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;


    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const postalIsValid = isFiveChars(enteredPostalCode);
    const cityIsValid = !isEmpty(cityInputRef);

    setFormValidity({
      name:nameIsValid,
      street:streetIsValid,
      city:cityIsValid,
      postal:postalIsValid
    });

    const formIsValid = nameIsValid && streetIsValid && cityIsValid && postalIsValid;

    if(!formIsValid)
    {
      return;
    }
    
    props.onConfirm({
      name:enteredName,
      street:enteredStreet,
      postalCode: enteredPostalCode,
      city:enteredCity
    })

    //after confirming order, make the cart empty and remove the modal

    
    // var cartModal = document.getElementById('CartModal');
    // console.log(cartModal);
  };



  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classes.control}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street'  ref={streetInputRef}/>
        {!formValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formValidity.postal && <p>Please enter a valid postal code (5 characters long)!</p>}
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button  className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;