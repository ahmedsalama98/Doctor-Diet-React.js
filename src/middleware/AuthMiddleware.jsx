
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AppAuthContext } from '../AppAuthContext';


const AuthMiddleware = ({children}) => {
  
    const { AppAuth  } = useContext(AppAuthContext);
    
    if (AppAuth.Auth === false) {
        return <Navigate to={'/login'} replace={true }/>
    }
    return children;
  
}

export default AuthMiddleware;