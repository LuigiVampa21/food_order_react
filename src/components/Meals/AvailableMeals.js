import React from 'react'

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

import DUMMY_MEALS from '../../mockData/dummy_meals';

const AvailableMeals = () => {
    return <section className={classes.meals}>
        <Card>
            <ul>
                {DUMMY_MEALS.map(meal => (
                    <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
                ))}
            </ul>
        </Card>
    </section>
}



export default AvailableMeals