import service from "../components/service"

const profileUpdateService = {
  updateProfile: (body, token) =>
    service.put("public/api/v1/dashboard/user/profile/update", body, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }),
}

export default profileUpdateService
