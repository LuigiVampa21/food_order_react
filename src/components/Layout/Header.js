import { Fragment } from 'react'

import HeaderCartButton from './HeaderCartButton';

import mealsImg from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = props => {

  return (
    <Fragment>
        <header className={classes.header}>
            <h1>ReactMeals</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImg} alt="severals meals" />
        </div>
    </Fragment>
  )
}

export default Header