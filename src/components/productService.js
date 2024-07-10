import service from '../components/service';

const productService = {
    getAll: (params) => {
        const { id } = params;
        return service.get(`/api/v1/rest/products/category/${id}`);
      },
};
  
export default productService;
