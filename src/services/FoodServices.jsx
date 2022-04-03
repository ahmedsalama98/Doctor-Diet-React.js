import axios from 'axios';
import { PASE_URL } from './APIDomainServices';
import { getAuthHeaders } from './TokenServices';

export const   foodSearchForAddNewMeal = (search) => {
    return axios.get(PASE_URL + '/user/food-search-for-add-new-meal?search='+search ,getAuthHeaders())
}
