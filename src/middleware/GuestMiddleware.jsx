
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AppAuthContext } from '../AppAuthContext';


const GuestMiddleware = ({children}) => {
  
    const { AppAuth  } = useContext(AppAuthContext);
    
    if (AppAuth.Auth === true) {
       
        return <Navigate to={'/'} replace={true }/>
    }
    return children;
  
}

export default GuestMiddleware;