import React, { useRef, useState } from 'react'

import Input from '../../UI/Input';
import classes from './MealItemForm.module.css';

const MealItemForm = props => {

  const [ amountIsValid, setAmountIsValid ] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = e => {
    e.preventDefault();

    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;

    if(enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum > 5 ){
      setAmountIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNum);
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
          defaultValue: '1'
        }} />
      <button>+ Add</button>
      {!amountIsValid && <p>Invalid amount</p>}
    </form>
  )
}

export default MealItemForm