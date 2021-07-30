import { useParams } from "react-router-dom";
import Card from "../../UI/Card";

import { useContext, useState,useEffect, useDebugValue } from "react";

import classes from './MealItemDetail.module.css'
import CartContext from '../../../store/cart-context';
import MealItemDetailForm from "./MealItemDetailForm";
import { cartActions } from '../../../redux-store/index';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import LoadingSpinner from '../../UI/LoadingSpinner'

const MealItemDetail =  (props) => {

  

    const dispatch = useDispatch();

    const [isLoading, setLoadingStatus] = useState(false);
 

    const [data,setData] = useState({});

    const params = useParams();
    
    useEffect( ()=> {
        
      const fetchData = async () => {
        const response = await fetch(`https://market-app-43d47-default-rtdb.firebaseio.com/market/${params.id}.json`  );

        const responseData = await response.json();

        console.log("INSIDE MEALDETAILFORM");
        console.log(response);

  
        setData(responseData);
      };
      fetchData();
    },[]);

   
    const addToCartHandler = amount => {

      dispatch(
        cartActions.addItemToCart({
        id: params.id,
        name: data.name,
        amount: amount,
        price: data.price
      })
      );
    }

    console.log(data.image);
    
    return <div className={classes.marketItem}>
        <Card>
           
           <div className={classes.sizeMeasure}>
             <h3>{data.name}</h3>
             <div className={classes.description}>{data.description}</div>
             <div className={classes.price}>${data.price}</div>
             <img className = {classes.image} src = {data.image} alt="image not available"></img>
             <p className= {classes.detail}>{data.detail}</p>
           </div>

           <div>
               <div className={classes.form}> <MealItemDetailForm id={params.id} onAddToCart={addToCartHandler} /></div>
           </div>
     
       </Card>
            
    </div>
   
}

export default MealItemDetail;