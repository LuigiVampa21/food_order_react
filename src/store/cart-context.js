import React from 'react';

// import DUMMY_MEALS from '../mockData/dummy_meals';

const CartContext = React.createContext({
    items: [],
    // items: DUMMY_MEALS,
    totalAmount: 0,
    addItem: (item) =>{},
    removeItem: (id) =>{},
    clearCart: () =>{}
})

export default CartContext;