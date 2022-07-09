import React from 'react';
import '../Product/product.css'
const ReviewOrder = (props) => {
    return (
        <div style={{borderBottom:'1px solid gray', marginBottom:'5px', paddingBottom:'5px', marginLeft:'200px', display:'flex'}}>
           <div style={{marginRight:'40px'}}>
           <img src={props.product.img} alt="" />
           </div>
            <div>
            <p className='product-name'>{props.product.name}</p>
            <p className='product-name'>{props.product.quantity}</p>
            <button onClick={()=>props.removeHandler(props.product.key)} className='main-button'>Remove</button>
            </div>
        </div>
    );
};

export default ReviewOrder;