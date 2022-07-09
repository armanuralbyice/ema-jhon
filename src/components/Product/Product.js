import React from 'react';
import '../Product/product.css'
import {Link} from "react-router-dom";
const Product = (props) => {
   const {name, seller, price, key} = props.product;
    return (
        <div className='product'>
            <div>
                <img src={props.product.img} alt=""/>
            </div>
            <div className="product-details">
                <p className='product name'><Link to={"/product/"+key}>{name}</Link></p>
                <br/>
                <p><small>By: {seller}</small></p>
                <p>${price}</p>
                {props.showAddCart && <button className='main-button' onClick={() => props.handelProductAdd(props.product)}>ADD TO
                    CART</button>}
            </div>
        </div>
    );
};

export default Product;