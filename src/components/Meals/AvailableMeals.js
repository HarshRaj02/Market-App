import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect , useState} from 'react';



const AvailableMeals = () => {

  const [market, setMarket] = useState([]);
  const [isLoading, isLoadingFunction] = useState(true);
  const [httpError, setErrorFunction] = useState();

  useEffect(()=>{

    const fetchMarket = async () => {
     const response = await fetch('https://market-app-43d47-default-rtdb.firebaseio.com/market.json');
     const responseData = await response.json();

     if(!response.ok)
       {
         console.log("inside response not ok");
         throw new Error("Something went Wrong!!");
       }
     const loadedMarket =[];

     for (const key in responseData)
       loadedMarket.push({
         id:key,
         name:responseData[key].name,
         description : responseData[key].description,
         price : responseData[key].price,
         image : responseData[key].image,
         detail: responseData[key].detail
       })

       setMarket(loadedMarket);
       isLoadingFunction(false);
    }
   


      fetchMarket().catch((error) => {
        isLoadingFunction(false);
        setErrorFunction(error.message);
        
      });


  },[]);

  if(isLoading) 
  {
    return <section className={classes.marketLoading}>
         <p>....Loading</p>
    </section>
   
  }

  console.log(httpError);
  if(httpError) {
    return <section className={classes.marketError}>
      <p>{httpError.message}</p>
    </section>
  }
  
  const mealsList = market.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      image = {meal.image}
      detail = {meal.detail}
    />

  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
