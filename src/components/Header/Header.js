import React, { useContext } from 'react';
import { userContext } from '../../App';
import logo from "../../images/logo.png"
import '../Header/Header.css'
import { Link } from 'react-router-dom';
const Header = () => {
    const [loggedInUser, setloggedInUser] = useContext(userContext);
    return (
        <div className='header'>
            <img src={logo} alt=""/>
            <nav>
                <Link to="/shop" > Shop </Link>
                <Link to="/review">Order Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                <a>{loggedInUser.email}</a>
                {
                    loggedInUser.email && <button style={{background:'black', color:'white', fontSize:'20px', cursor:'pointer'}} onClick={()=>setloggedInUser({})}>Log Out</button>
                }
            </nav>
        </div>
    );
};

export default Header;