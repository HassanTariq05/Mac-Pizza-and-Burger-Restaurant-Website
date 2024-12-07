import service from "../components/service"

const getDeliveryPoints = {
  get: () => {
    return service.get(`public/api/v1/rest/delivery-points?perPage=100`)
  },
}

export default getDeliveryPoints
