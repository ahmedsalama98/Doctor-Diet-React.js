import axios from 'axios';
import { PASE_URL } from './APIDomainServices';
import { getAuthHeaders } from './TokenServices';

export const   getWeightsHistory = () => {
    return axios.get(PASE_URL + '/user/weights' ,getAuthHeaders())
  }
  export const   deleteUserWeight = (weight_id) => {
    return axios.delete(`${PASE_URL}/user/weight/${weight_id}/destroy` ,getAuthHeaders())
}
  


 export const   createUserNewWeight = (data) => {
    return axios.post(PASE_URL +'/user/weight/store',data ,getAuthHeaders())
  }