
import axios from 'axios';
import { PASE_URL } from './APIDomainServices';

export const storeContact = (data) => {
    
    return   axios.post(PASE_URL + '/contact/store', data);
  }
