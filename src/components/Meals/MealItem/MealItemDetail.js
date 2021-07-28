import { useParams } from "react-router-dom";
import Card from "../../UI/Card";

import { useContext, useState,useEffect, useDebugValue } from "react";

import classes from './MealItemDetail.module.css'
import CartContext from '../../../store/cart-context';
import { classExpression } from "@babel/types";
import MealItemForm from "./MealItemForm";
import LoadingSpinner from '../../UI/LoadingSpinner'
const MealItemDetail =  () => {

    // OPTIMIZATION REQUIRED
    //
    //

    //useEffect, call API in useEffect


    const cartCtx = useContext(CartContext);
    const [name, setName] = useState(null);
    const [description,setDescription] = useState(null);
    const [price, setPrice] = useState(0);
    const [isLoading, setLoadingStatus] = useState(false);

    const params = useParams();
    
    useEffect(()=> {
        fetchItem();
    });
    
    const fetchItem = async () => {
        const response = await fetch(`https://market-app-43d47-default-rtdb.firebaseio.com/market/${params.id}.json`  );
        const responseData = await response.json();

        console.log(responseData);

        setName(responseData.name);
        setDescription(responseData.description);
        setPrice(responseData.price);
       
    }
  
  

   const addToCartHandler = amount => {
    cartCtx.addItem({
      id: params.id,
      name: name,
      amount: amount,
      price: price
    });
  };


  
    return <div className={classes.marketItem}>
        <Card>
           
           <div className={classes.sizeMeasure}>
             <h3>{name}</h3>
             <div className={classes.description}>{description}</div>
             <div className={classes.price}>{price}</div>
           </div>

           <div>

               <div className={classes.form}> <MealItemForm id={params.id} onAddToCart={addToCartHandler} /></div>
       
      </div>
     
       </Card>
            
    </div>
   
}

export default MealItemDetail;