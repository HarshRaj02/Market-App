import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import { Link } from 'react-router-dom';
import { cartActions } from '../../../redux-store/index';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const MealItem = (props) => {


  const dispatch = useDispatch();

  const items = useSelector(state => state.items);
  const totalAmount = useSelector(state => state.totalAmount);
  
  const price = `$${props.price.toFixed(2)}`;


  const addToCartHandler = amount => {



    dispatch(
      cartActions.addItemToCart({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    })
    );

  }
  return (
   
    <li className={classes.meal}>
      <div>
      <Link to = {`/mealItem/${props.id}`} style={{ textDecoration: 'none'} }>
      <h3>{props.name}</h3>
      </Link>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>

  );
};

export default MealItem;
