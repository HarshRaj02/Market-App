import { useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';

import classes from './HeaderCartButton.module.css';
import { useSelector } from 'react-redux';


const HeaderCartButton = (props) => {


  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  
  const items = useSelector(state => state.items);
  const totalQuantity = useSelector(state => state.totalQuantity);

 
  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;


  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default HeaderCartButton;
