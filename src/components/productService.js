import service from '../components/service';

const productService = {
    getAll: (params) => {
        const { id } = params;
        return service.get(`public/api/v1/rest/products/category/${id}`);
      },
};
  
export default productService;
