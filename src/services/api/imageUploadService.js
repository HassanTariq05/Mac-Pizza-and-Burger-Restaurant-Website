import service from "../network/service"

const imageUploadService = {
  uploadImage: (formData, token) =>
    service.post("public/api/v1/dashboard/galleries", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": `multipart/form-data`,
      },
    }),
}

export default imageUploadService
