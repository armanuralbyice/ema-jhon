import React, { useContext } from 'react';
import { userContext } from '../../App';
import { useForm } from 'react-hook-form';
import './Shpment.css'
const Shipment = () => {
    const [loggedInUser, setloggedInUser] = useContext(userContext);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);  
    return (
     
      <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name",{ required: true })} defaultValue={loggedInUser.name} placeholder='Name'  />
        {errors.name && <span className='error'>This field is required</span>}
        <input {...register("email", { required: true })} defaultValue={loggedInUser.email} placeholder='Email'/>
        {errors.email && <span className='error'>This field is required</span>}
        <input {...register("address", { required: true })} placeholder='Address'/>
        {errors.address && <span className='error'>This field is required</span>}
        <input {...register("phone", { required: true })} placeholder='Phone'/>
        {errors.phone && <span className='error'>This field is required</span>}
        
        
        <input type="submit" />
      </form>
    );
};

export default Shipment;