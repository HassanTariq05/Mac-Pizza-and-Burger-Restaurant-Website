import service from '../components/service';

const productService = {
    getAll: (params) => {
        const { id, page } = params;
        return service.get(`public/api/v1/rest/products/category/${id}?page=${page}`);
      },
};
  
export default productService;
