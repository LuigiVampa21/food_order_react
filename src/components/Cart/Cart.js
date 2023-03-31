import React, { useContext, useState } from 'react'
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import Checkout from './Checkout';

import axios from 'axios';

import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    };
    const orderHandler = () => {
        setIsCheckout(true);
    };
    const submitOrderHandler = async orderObj => {
        try {
            setIsSubmitting(true);
            setIsSubmitted(false);
            await axios.post('https://react-test-3e7fc-default-rtdb.europe-west1.firebasedatabase.app/orders.json', orderObj);
        } catch (err) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
            setIsSubmitted(true);
            cartCtx.clearCart();
        }
    };
    const cancelOrder = () => {
        setIsCheckout(false);
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map(item => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onAdd={cartItemAddHandler.bind(null, item)}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)} />
            ))}
        </ul>
    )

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
            {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    )

    const isSubmittingModalContent = <p>Sending order data..</p>
    const submittedModalContent =
        <React.Fragment>
            <p>Order submitted</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onHideCart}>Close</button>
            </div>
        </React.Fragment>

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div>
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{totalAmount}</span>
                </div>
            </div>
            {isCheckout && <Checkout onOrder={submitOrderHandler} onCancel={cancelOrder} />}
            {!isCheckout && (modalActions
            )}
        </React.Fragment>
    )

    return (
        <Modal onClose={props.onHideCart}>
            {!isSubmitting && !isSubmitted && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {isSubmitted && submittedModalContent}
        </Modal>
    )
}

export default Cart