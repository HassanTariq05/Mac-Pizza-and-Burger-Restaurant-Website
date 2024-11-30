import service from "./service"

const deleteAddressService = {
  delete: (id, body, token) =>
    service.delete(`public/api/v1/dashboard/user/addresses/${id}`, {
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      data: body,
    }),
}

export default deleteAddressService
