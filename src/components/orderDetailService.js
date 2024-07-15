import React from 'react';
import service from '../components/service';

const orderDetailService = {
  getDetail: (id, headers) => service.get(`public/api/v1/dashboard/admin/orders/${id}`, { headers }),
};

export default orderDetailService;
