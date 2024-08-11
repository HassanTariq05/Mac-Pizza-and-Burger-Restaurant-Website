import React from 'react'
import service from '../components/service';

const couponService = {
  check: (params, headers) => service.post('public/api/v1/rest/coupons/check',params, { headers } ),
};
  
export default couponService;