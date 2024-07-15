import React from 'react'
import service from '../components/service';

const authService = {
  authenticate: (params) => service.post('public/api/v1/auth/login',  params ),
};
  
export default authService;
