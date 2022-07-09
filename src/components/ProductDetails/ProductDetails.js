import React from 'react';
import {useParams} from "react-router-dom";
import fakeData from "../../fakeData";
import Product from "../Product/Product";

const ProductDetails = (props) => {
    let {productKey} = useParams();
    const product = fakeData.find(pd=> pd.key === productKey)
    console.log(product)
    return (
        <div>
            <h2>Product Details</h2>
            <Product showAddCart = {false} product={product}>
            </Product>
        </div>
    );
};

export default ProductDetails;