import { Fragment } from 'react';

import HeaderCartButton from './HeaderCartButton';
import marketImage from '../../assets/market.jpeg';
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';


const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
       <NavLink to = "/" style={{ textDecoration: 'none', color: 'white' }}>
       <h1>Market App</h1>
       </NavLink> 
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={marketImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
