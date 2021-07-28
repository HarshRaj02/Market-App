import { useContext, useState } from 'react';

import {Route} from 'react-router-dom'
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import CartProvider from './store/CartProvider';
import CartContext from './store/cart-context';
import MealItemDetail from './components/Meals/MealItem/MealItemDetail';



function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const cartCtx = useContext(CartContext)

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);

   //cartCtx.emptyCart();
  };

  return (

    <CartProvider>
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Route path='/' exact>
          <Meals />
        </Route>

        <Route path='/mealItem/:id' exact>
          <MealItemDetail></MealItemDetail>
        </Route>

        {/* <Route path='/' */}
        
      </main>
    </CartProvider>
  );
}

export default App;
