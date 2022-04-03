


import axios from 'axios';
import { PASE_URL } from './APIDomainServices';
import { getAuthHeaders } from './TokenServices';

export const   getMealCategories = () => {
    return axios.get(PASE_URL + '/meal-categories' ,getAuthHeaders())
}
export const   setNewUserMeal = (data) => {
    return axios.post(PASE_URL + '/user-meals/store' ,data,getAuthHeaders())
}




