import React, {useEffect, useState, } from 'react';
import {getDatabaseCart, removeFromDatabaseCart} from "../../utilities/databaseManager";
import fakeData from "../../fakeData";
import ReviewOrder from "../ReviewOrder/ReviewOrder";
import Cart from '../Cart/Cart';
import '../Product/product.css'
import { Link } from 'react-router-dom';
const Review = () => {
    const [cart, setCart] = useState([])
    
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd=>pd.key!==productKey)
        setCart(newCart)
        removeFromDatabaseCart(productKey)

    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)
        const productCart = productKeys.map(key=> {
            const product = fakeData.find(pd=>pd.key === key)
            product.quantity = savedCart[key]
            return product

        })
        setCart(productCart)
    }, [])
    return (
        <div style={{display:'flex'}}>
            <div style={{width:'70%'}}>
            {
                cart.map(product=><ReviewOrder product={product} removeHandler={removeProduct}></ReviewOrder>)
            }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}>
                <Link to = '/shipment'><button className='main-button'>Proceed Checkout</button></Link>
                </Cart>
                
            </div>
        </div>
    );
};

export default Review;