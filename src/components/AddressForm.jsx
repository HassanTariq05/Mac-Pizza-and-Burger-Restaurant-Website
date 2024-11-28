import React from "react"
import { useForm } from "react-hook-form"
import "../css/AddressForm.css"
import { MDBIcon } from "mdb-react-ui-kit"
import { GOOGLE_MAPS_API_KEY } from "./service"

const AddressForm = ({
  selectedButton,
  formattedAddress,
  coords,
  setEntranceMapClicked,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data)
  }

  const handleMapClick = () => {
    setEntranceMapClicked(true)
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
              {formattedAddress}
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
                src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_API_KEY}&q=${coords?.lat},${coords?.lng}&zoom=15`}
              ></iframe>
              <div class="hover-text">Mark Entrance</div>
            </div>
          </div>
          <div className="save-div">
            <button type="submit" className="icon-button-2">
              <span className="text-2">Save</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddressForm
