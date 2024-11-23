import service from "../components/service"

const allOrdersService = {
  get: (token) => {
    return service.get(`public/api/v1/dashboard/user/orders/paginate`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": `multipart/form-data`,
      },
    })
  },
}

export default allOrdersService
