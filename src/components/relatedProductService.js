import service from '../components/service';

const relatedProductService = {
    getAll: (params) => {
        const { uuid } = params;
        return service.get(`/api/v1/rest/products/related/${uuid}`);
      },
};
  
export default relatedProductService;
