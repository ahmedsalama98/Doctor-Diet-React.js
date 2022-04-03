import axios from 'axios';
import { getSettingFromLocalStorage } from './SettingsServices';

export const getAuthToken = () => {
    let token = localStorage.getItem('AUTH_TOKEN');
    return token != null && token !== undefined ? token : '';
}

export const setAuthToken = (token) => {
    
    localStorage.setItem('AUTH_TOKEN', token);
}

export const deleteCurrentAuthToken = () => {
    
    localStorage.removeItem('AUTH_TOKEN');
}

export const  AuthTokenInterceptor = (lang = 'en') => {
    axios.interceptors.request.use(request => {
        request.headers.Authorization = `Bearer ${getAuthToken()}`;
        request.headers.Lang = lang ==='ar'?'ar':'en';
            return request;
      });
}


export  const getAuthHeaders = (hasFiles = false) => {
    
  let Lang = getSettingFromLocalStorage().lang;
  let HeaderWithFiles ={
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            Lang,
            "Content-Type": "multipart/form-data",
        }
    }


    let HeaderWithOutFiles ={
        headers: {
            Authorization: `Bearer ${getAuthToken()}`,
            Lang,
        }
    }


    return hasFiles === true ? HeaderWithFiles : HeaderWithOutFiles;
}
