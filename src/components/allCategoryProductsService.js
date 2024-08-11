import service from '../components/service';

const allCategoryProductService = {
  get: (params) => {
    const { id, page } = params;
    return service.get(`public/api/v1/rest/products/shop/${id}?page=${page}`);
  },
};

export default allCategoryProductService;
