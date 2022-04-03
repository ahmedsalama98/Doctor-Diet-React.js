


import axios from 'axios';
import { PASE_URL } from './APIDomainServices';
import { getAuthHeaders } from './TokenServices';

export const   getMealCategories = () => {
    return axios.get(PASE_URL + '/meal-categories' ,getAuthHeaders())
}
export const   setNewUserMeal = (data) => {
    return axios.post(PASE_URL + '/user-meals/store' ,data,getAuthHeaders())
}
export const   getTodayMeals = () => {
    return axios.get(PASE_URL + '/user/today-meals' ,getAuthHeaders())
}

export const   deleteUserMeal = (meal_id) => {
    return axios.delete(`${PASE_URL}/user/today-meal/${meal_id}/destroy` ,getAuthHeaders())
}
export const   getUserMeals = () => {
    return axios.get(PASE_URL + '/user/meals' ,getAuthHeaders())
}

