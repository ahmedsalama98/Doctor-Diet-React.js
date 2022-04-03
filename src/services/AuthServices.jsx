import axios from 'axios';
import { PASE_URL } from './APIDomainServices';
import { getAuthHeaders } from './TokenServices';


export const   AuthCheck = () => {
    return axios.get(PASE_URL + '/user' ,getAuthHeaders())
}



export const AuthLogin = (credentials) => {
    
  return   axios.post(PASE_URL + '/login', credentials);
}
export const AuthSignUp = (credentials) => {
    
    return   axios.post(PASE_URL + '/signup', credentials ,getAuthHeaders(true));
}
export const AuthLogout = () => {
    return axios.delete(PASE_URL + '/logout' , getAuthHeaders());
}

export const AuthEditInfo = (credentials) => {
    
    return   axios.post(PASE_URL + '/user/edit-information', credentials ,getAuthHeaders());
  }

  export const AuthEditPassword = (credentials) => {
    
    return   axios.post(PASE_URL + '/user/edit-password', credentials ,getAuthHeaders());
  }

  export const AuthEditImage = (credentials) => {
    
    return   axios.post(PASE_URL + '/user/edit-avatar', credentials ,getAuthHeaders(true));
  }
  