import React from 'react'
import service from '../components/service';

const categoryService = {
  getAll: (params) => service.get('/api/v1/rest/categories/paginate', { params }),
};
  
export default categoryService;
