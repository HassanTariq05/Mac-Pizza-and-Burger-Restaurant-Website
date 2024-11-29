import service from "../components/service"

const getAddressesService = {
  get: (token) => {
    return service.get(`public/api/v1/dashboard/user/addresses`, {
      headers: {
        Authorization: `${token}`,
      },
    })
  },
}

export default getAddressesService
