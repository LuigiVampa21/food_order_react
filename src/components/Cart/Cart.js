import { useContext } from 'react'

import Modal from '../UI/Modal';
import CartItem from './CartItem';

import CartContext from '../../store/cart-context';

import classes from './Cart.module.css';

const Cart = props => {

    const cartCtx = useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

    const cartItemAddHandler = item => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    const cartItemRemoveHandler = id => { 
        cartCtx.removeItem(id);
    };

    return (
        <Modal onClose={props.onHideCart}>
            <ul className={classes['cart-items']}>
                {cartCtx.items.map(item => (
                    <li>
                        <CartItem
                            key={item.id}
                            name={item.name}
                            amount={item.amount}
                            price={item.price}
                            onAdd={cartItemAddHandler.bind(null, item)}
                            onRemove={cartItemRemoveHandler.bind(null, item.id)} />
                    </li>
                ))}
            </ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart