import axios from 'axios';

const service = axios.create({
  baseURL: 'https://api.macburger.kg',
  timeout: 16000,
  withCredentials: false,
});

export const baseURL= 'https://api.macburger.kg/public';
export default service