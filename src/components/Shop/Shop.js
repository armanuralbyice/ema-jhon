import React, {useState} from 'react';
import fakeData from "../../fakeData";
import Product from "../Product/Product";
import '../Shop/Shop.css'
import Cart from "../Cart/Cart";
import {addToDatabaseCart} from "../../utilities/databaseManager";
import {Link} from "react-router-dom";
const Shop = () => {
    const first10 = fakeData.slice(0,10);
    const [products, setProduct] = useState(first10)
    const [cart, setCart] = useState([])
    const handelProductAdd =(product)=>{
        const newCart = [...cart, product]
        setCart(newCart)
        const sameProduct = newCart.filter(pd=>pd.key===product.key);
        const count = sameProduct.length;
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product =>
                        <Product showAddCart={true} handelProductAdd={handelProductAdd} product={product}></Product>)
                }
            </div>
            <div className='cart-container'>
             <Cart cart={cart}>
             <Link to = {"/review"}><button className='main-button'>Review Order</button></Link>
             </Cart>
            </div>
        </div>
    );
};

export default Shop;