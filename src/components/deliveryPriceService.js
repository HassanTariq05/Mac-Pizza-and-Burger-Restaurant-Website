import service from './service';

const deliveryPriceService = {
    getPrice: () => {
        return service.get(`public/api/v1/rest/delivery-prices`);
      },
};
  
export default deliveryPriceService;
