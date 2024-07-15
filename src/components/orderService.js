import React from 'react'
import service from '../components/service';

const orderService = {
  create: (params, headers) => service.post('public/api/v1/dashboard/admin/orders', params, { headers } ),
};
  
export default orderService;
