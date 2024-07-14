import axios from 'axios';

const service = axios.create({
  baseURL: 'http://192.168.100.174:8000',
  timeout: 16000,
  withCredentials: false,
});

export const baseURL= 'http://192.168.100.174:8000';
export default service