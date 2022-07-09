import React from 'react';

import '../Product/product.css'
const Cart = (props) => {
    const cart = props.cart;
    let total = 0;
    for (let i=0; i<cart.length; i++){
        const product = cart[i];
         total = total+product.price;
    }
    const tax = (total/10)
    let grandTotal = (total+ tax).toFixed(2)
    return (
        <div style={{paddingLeft:'120px', textAlign:'center'}}>
            <p>Order Item: {cart.length}</p>
            <p>Product Price: {(total).toFixed(2)}</p>
            <p>Tax+VAT: {(tax).toFixed(2)}</p>
            <h3 style={{color: 'goldenrod'}}>Total Price: {grandTotal}</h3>
            {
                props.children
            }
            
        </div>
    );
};

export default Cart;