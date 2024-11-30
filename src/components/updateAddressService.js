import service from "../components/service"

const updateAddressService = {
  update: (id, body, token) =>
    service.put(`public/api/v1/dashboard/user/addresses/${id}`, body, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }),
}

export default updateAddressService
