import { useParams } from "react-router-dom";
import Card from "../../UI/Card";

import { useContext, useState,useEffect, useDebugValue } from "react";

import classes from './MealItemDetail.module.css'
import CartContext from '../../../store/cart-context';
import MealItemForm from "./MealItemForm";
import LoadingSpinner from '../../UI/LoadingSpinner'
const MealItemDetail =  () => {

    // OPTIMIZATION REQUIRED
    //
    //

  


    const cartCtx = useContext(CartContext);
    const [isLoading, setLoadingStatus] = useState(false);

    const [data,setData] = useState({});

    const params = useParams();
    
    useEffect( ()=> {
        
      const fetchData = async () => {
        const response = await fetch(`https://market-app-43d47-default-rtdb.firebaseio.com/market/${params.id}.json`  );
        const responseData = await response.json();
  
        console.log(responseData);
        setData(responseData);
      };
      fetchData();
    },[]);

   

  
  

   const addToCartHandler = amount => {
    cartCtx.addItem({
      id: params.id,
      name: data.name,
      amount: amount,
      price: data.price
    });
  };


  
    return <div className={classes.marketItem}>
        <Card>
           
           <div className={classes.sizeMeasure}>
             <h3>{data.name}</h3>
             <div className={classes.description}>{data.description}</div>
             <div className={classes.price}>{data.price}</div>
           </div>

           <div>

               <div className={classes.form}> <MealItemForm id={params.id} onAddToCart={addToCartHandler} /></div>
       
      </div>
     
       </Card>
            
    </div>
   
}

export default MealItemDetail;