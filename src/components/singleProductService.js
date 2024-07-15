import service from '../components/service';

const singleProductService = {
    getAll: (params) => {
        const { id } = params;
        return service.get(`public/api/v1/rest/products/${id}`);
      },
};
  
export default singleProductService;
