import React from 'react'
import service from '../components/service';

const orderService = {
  getAll: (params) => service.post('/api/v1/dashboard/admin/orders', params ),
};
  
export default orderService;
