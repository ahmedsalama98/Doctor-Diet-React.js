import axios from 'axios';
import { PASE_URL } from './APIDomainServices';
import { getAuthHeaders } from './TokenServices';

export const   foodSearchForAddNewMeal = (query) => {
    return axios.get(PASE_URL + '/user/food-search-for-add-new-meal'+query ,getAuthHeaders())
}
export const   getFoodCategories = () => {
    return axios.get(PASE_URL + '/food-categories' ,getAuthHeaders())
}


export const getFoodsWithFilters = (query) => {
    return axios.get(PASE_URL + '/foods'+query ,getAuthHeaders())
}


export const getFoodById = (id) => {
    return axios.get(PASE_URL + '/foods/'+id ,getAuthHeaders())
}

