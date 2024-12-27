import React from "react"
import { useForm } from "react-hook-form"
import "../css/AddressForm.css"
import { MDBIcon } from "mdb-react-ui-kit"
import { GOOGLE_MAPS_API_KEY } from "../env/env"
import createAddressService from "../services/api/createAddressService"
import toast from "react-hot-toast"
import { useState } from "react"
import updateAddressService from "../services/api/updateAddressService"
import deleteAddressService from "../services/api/deleteAddressService"

const AddressForm = ({
  selectedButton,
  formattedAddress,
  coords,
  handleEntranceMapClick,
  handleSaveAddress,
  selectedEditAddress,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState()
  const [deleteLoading, setDeleteLoading] = useState()

  const saveGuestAddress = (data, tagType, selectedEditAddress) => {
    setLoading(true)

    const streetHouseObj = {
      additional: data.additionalInfo,
      address: formattedAddress,
      address1: "Bishkek, Kyrgyzstan",
      building: data.buildingName || "",
      door: data.doorNumber,
      floor: data.floorNumber,
      tag: tagType,
      type: selectedButton.toLowerCase(),
    }

    const createAddressObj = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      firstname: "",
      lastname: "",
      phone: "12345",
      zipcode: "65500",
      region_id: "1",
      country_id: "1",
      street_house_number: JSON.stringify(streetHouseObj),
      location: { longitude: coords.lng, latitude: coords.lat },
      floor: data.floorNumber,
      door: data.doorNumber,
      building: data.buildingName || "",
      additional: data.additionalInfo,
      type: selectedButton.toLowerCase(),
      tag: tagType,
    }

    let guestAddresses =
      JSON.parse(localStorage.getItem("guestAddresses")) || []

    if (selectedEditAddress) {
      const editAddressIndex = guestAddresses.findIndex((address) => {
        return (
          address.street_house_number ===
          selectedEditAddress.street_house_number
        )
      })

      if (editAddressIndex !== -1) {
        guestAddresses[editAddressIndex] = createAddressObj
      }
    } else {
      const existingAddressIndex = guestAddresses.findIndex((address) => {
        return (
          address.street_house_number === createAddressObj.street_house_number
        )
      })

      if (existingAddressIndex !== -1) {
        guestAddresses[existingAddressIndex] = createAddressObj
      } else {
        guestAddresses.push(createAddressObj)
      }
    }
    localStorage.setItem("guestAddresses", JSON.stringify(guestAddresses))

    setLoading(false)
    handleSaveAddress()
    toast.success("Address Saved")
  }

  const onSubmit = async (data) => {
    try {
      let tagType
      if (selectedButton === "Home") {
        tagType = "Home"
      } else if (selectedButton === "Apartment") {
        tagType = "Apartment"
      } else if (selectedButton === "Office") {
        tagType = "Office"
      } else {
        tagType = "School"
      }
      if (localStorage.getItem("isGuestUser") === "true") {
        saveGuestAddress(data, tagType, selectedEditAddress)
        return
      }

      const userObj = JSON.parse(localStorage.getItem("user"))

      const streetHouseObj = {
        additional: data.additionalInfo,
        address: formattedAddress,
        address1: "Bishkek, Kyrgyzstan",
        building: data.buildingName || "",
        door: data.doorNumber,
        floor: data.floorNumber,
        tag: tagType,
        type: selectedButton.toLowerCase(),
      }

      const createAddressPayload = {
        firstname: userObj.firstname,
        lastname: userObj.lastname,
        phone: userObj.phone || "12345",
        zipcode: "65500",
        region_id: "1",
        country_id: "1",

        street_house_number: JSON.stringify(streetHouseObj),
        location: { longitude: coords.lng, latitude: coords.lat },
        floor: data.floorNumber,
        door: data.doorNumber,
        building: data.buildingName || "",
        additional: data.additionalInfo,
        type: selectedButton.toLowerCase(),
        tag: tagType,
      }

      setLoading(true)
      if (selectedEditAddress === null) {
        const createAddressResponse = await createAddressService.create(
          createAddressPayload,
          localStorage.getItem("token")
        )
        setLoading(false)
        handleSaveAddress()
        toast.success("Address Saved")
      } else {
        const streetHouseObj = {
          additional: data.additionalInfo,
          address: JSON.parse(selectedEditAddress.street_house_number).address,
          address1: "Bishkek, Kyrgyzstan",
          building: data.buildingName || "",
          door: data.doorNumber,
          floor: data.floorNumber,
          tag: tagType,
          type: selectedButton.toLowerCase(),
        }

        const updateAddressPayload = {
          firstname: userObj.firstname,
          lastname: userObj.lastname,
          phone: userObj.phone || "12345",
          zipcode: "65500",
          region_id: "1",
          country_id: "1",

          street_house_number: JSON.stringify(streetHouseObj),
          location: { longitude: coords.lng, latitude: coords.lat },
          floor: data.floorNumber,
          door: data.doorNumber,
          building: data.buildingName || "",
          additional: data.additionalInfo,
          type: selectedButton.toLowerCase(),
          tag: tagType,
        }

        const updateAddressResponse = await updateAddressService.update(
          selectedEditAddress.id,
          updateAddressPayload,
          localStorage.getItem("token")
        )
        setLoading(false)
        handleSaveAddress()
        toast.success("Address Updated")
      }
    } catch (error) {
      toast.error("Unable to save address")
      setLoading(false)
    }
  }

  const deleteGuestAddress = (id) => {
    setDeleteLoading(true)
    let guestAddresses =
      JSON.parse(localStorage.getItem("guestAddresses")) || []
    guestAddresses = guestAddresses.filter((address) => address.id !== id)
    localStorage.setItem("guestAddresses", JSON.stringify(guestAddresses))
    setDeleteLoading(false)
    handleSaveAddress()
    toast.success("Address Deleted")
  }

  const handleDeleteAddress = async () => {
    try {
      if (localStorage.getItem("isGuestUser") === "true") {
        deleteGuestAddress(selectedEditAddress.id.toString())
        return
      }
      setDeleteLoading(true)
      const body = {
        ids: [selectedEditAddress.id.toString()],
      }
      const token = localStorage.getItem("token")
      const response = await deleteAddressService.delete(
        selectedEditAddress.id,
        body,
        token
      )
      setDeleteLoading(false)
      handleSaveAddress()
      toast.success("Address deleted")
    } catch (error) {
      toast.error("Unable to delete address")
      setDeleteLoading(false)
    }
  }

  const handleMapClick = () => {
    handleEntranceMapClick()
  }

  return (
    <div className="address-form">
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="left-column">
          <div className="address-details">
            <p className="address-title">
              <span className="location-icon">
                <MDBIcon
                  icon="map-marker-alt"
                  size="1x"
                  color="none"
                  style={{ cursor: "pointer" }}
                />
              </span>{" "}
              {selectedEditAddress
                ? JSON.parse(selectedEditAddress?.street_house_number)?.address
                : formattedAddress}
            </p>
            <p style={{ marginBottom: "0px" }} className="address-subtitle">
              Bishkek, Kyrgyzstan
            </p>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="floor-number" className="field-label">
                Floor Number
              </label>
              <input
                id="floor-number"
                type="text"
                defaultValue={
                  selectedEditAddress
                    ? JSON.parse(selectedEditAddress?.street_house_number)
                        ?.floor || ""
                    : ""
                }
                placeholder="Floor Number"
                className="field-input"
                {...register("floorNumber", {
                  required: "Floor Number is required",
                })}
              />
              {errors.floorNumber && (
                <p className="error-message">{errors.floorNumber.message}</p>
              )}
            </div>

            <div className="form-field">
              <label htmlFor="door-number" className="field-label">
                Door Number
              </label>
              <input
                id="door-number"
                type="text"
                placeholder="Door Number"
                defaultValue={
                  selectedEditAddress
                    ? JSON.parse(selectedEditAddress?.street_house_number)
                        ?.door || ""
                    : ""
                }
                className="field-input"
                {...register("doorNumber", {
                  required: "Door Number is required",
                })}
              />
              {errors.doorNumber && (
                <p className="error-message">{errors.doorNumber.message}</p>
              )}
            </div>
          </div>

          {selectedButton !== "Home" && (
            <div className="form-field">
              <label htmlFor="building-name" className="field-label">
                Building Name
              </label>
              <input
                id="building-name"
                type="text"
                placeholder="Building Name"
                defaultValue={
                  selectedEditAddress
                    ? JSON.parse(selectedEditAddress?.street_house_number)
                        ?.building || ""
                    : ""
                }
                className="field-input"
                {...register("buildingName", {
                  required: "Building Name is required",
                })}
              />
              {errors.buildingName && (
                <p className="error-message">{errors.buildingName.message}</p>
              )}
            </div>
          )}

          <div className="form-field">
            <label htmlFor="additional-info" className="field-label">
              Additional Information
            </label>
            <textarea
              id="additional-info"
              defaultValue={
                selectedEditAddress
                  ? JSON.parse(selectedEditAddress?.street_house_number)
                      ?.additional || ""
                  : ""
              }
              placeholder="Additional Information"
              className="field-textarea"
              {...register("additionalInfo")}
            />
          </div>
        </div>

        <div className="right-column">
          <div className="map-section">
            <h3 className="map-title">Mark your entrance</h3>
            <p className="map-subtitle">Help the courier reach you faster</p>
            <div class="map-placeholder" onClick={handleMapClick}>
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: "0", pointerEvents: "none" }}
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${
                  selectedEditAddress !== null
                    ? selectedEditAddress?.location?.latitude
                    : coords?.lat
                },${
                  selectedEditAddress !== null
                    ? selectedEditAddress?.location?.longitude
                    : coords?.lng
                }&zoom=19`}
              ></iframe>
              <div class="hover-text">Mark Entrance</div>
            </div>
          </div>
          <div className="save-div">
            <button
              type="button"
              onClick={handleDeleteAddress}
              className={`icon-button-3 ${loading ? "loading" : ""}`}
            >
              {deleteLoading ? (
                <div className="loader-1"></div>
              ) : (
                <span className="text-3">Delete</span>
              )}
            </button>
            <button
              type="submit"
              className={`icon-button-2 ${loading ? "loading" : ""}`}
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                <span className="text-2">Save</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddressForm
