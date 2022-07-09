import React, { useContext } from 'react';
import { userContext } from '../../App';
import { useLocation,Navigate, Route } from 'react-router-dom';
const PrivateRoute = ({children}) => {
    const [loggedInUser, setloggedInUser] = useContext(userContext);
            const location = useLocation();

        if(!loggedInUser.email){
            return <Navigate to="/login" state ={{from: location}} replace></Navigate>
        }
        
        return children;   
};

export default PrivateRoute;