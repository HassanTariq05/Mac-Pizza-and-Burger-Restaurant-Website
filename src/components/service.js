import axios from 'axios';

const service = axios.create({
  baseURL: 'https://api.macburger.kg',
  timeout: 16000,
  withCredentials: false,
});

export const baseURL= 'https://api.macburger.kg/public';
export const GOOGLE_MAPS_API_KEY = 'AIzaSyBiohy_1HfSjWgJBKgAs57BAHguyjH6bIU';
export default service