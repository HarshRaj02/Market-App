import { useContext } from 'react';

import MealItemForm from './MealItemForm';
import classes from './MealItem.module.css';
import CartContext from '../../../store/cart-context';
import { Link } from 'react-router-dom';


const MealItem = (props) => {
  const cartCtx = useContext(CartContext);

  // console.log("PROPS!");
  // console.log(props);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = amount => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price
    });
  };

  return (
   
    <li className={classes.meal}>
      <div>
      <Link to = {`/mealItem/${props.id}`}><h3>{props.name}</h3></Link>
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
