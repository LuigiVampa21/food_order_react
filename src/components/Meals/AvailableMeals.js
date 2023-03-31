import React, { useEffect, useState } from 'react'

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

import classes from './AvailableMeals.module.css';

// import DUMMY_MEALS from '../../mockData/dummy_meals';
import axios from 'axios';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const response = await axios.get('https://react-test-3e7fc-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
                // const response = await axios.get('https://react-test-3e7fc-default-rtdb.europe-west1.firebasedatabase.app/meals');
                const { data } = response;
                let meals_arr = [];
                for (const meal in data) {
                    meals_arr = [...meals_arr, {...data[meal], id:meal}];
                };
                setMeals([...meals_arr]);
                // console.log(meals);              
            } catch (err) {
                const errorData = {...err};
                setError(errorData);
                // console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        )();

    }, []);

    if (isLoading) {
        return (
          <section className={classes.MealsLoading}>
            <p>Loading...</p>
          </section>
        );
      }

    if(error){
            return (
              <section className={classes.MealsError}>
                <p>{error.message}</p>
              </section>
            );
    }

    return <section className={classes.meals}>
        <Card>
            <ul>
                {meals.map(meal => (
                    <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.description} price={meal.price} />
                ))}
            </ul>
        </Card>
    </section>
}



export default AvailableMeals