import React, { useState } from "react"
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBIcon,
} from "mdb-react-ui-kit"
import "../css/DeliveryTypeModal.css"

export default function DeliveryTypeModal({
  isOpen,
  onDeliveryTypeModalClose,
  onDeliveryButtonClick,
  onPickupButtonClick,
}) {
  const handleCloseModal = () => {
    onDeliveryTypeModalClose()
  }

  const handleDeliveryButtonClick = () => {
    onDeliveryButtonClick()
  }

  const handlePickupButtonClick = () => {
    onPickupButtonClick()
  }

  return (
    <>
      <MDBModal open={isOpen} tabIndex={-1}>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Select Option</MDBModalTitle>
              <MDBIcon
                icon="times"
                size="1x"
                color="none"
                onClick={handleCloseModal}
                style={{ cursor: "pointer" }}
              />
            </MDBModalHeader>
            <MDBModalBody>
              <div className="btn-div">
                <button
                  onClick={handlePickupButtonClick}
                  className="icon-button-5"
                >
                  Pickup
                </button>
                <button
                  onClick={handleDeliveryButtonClick}
                  className="icon-button-4"
                >
                  Delivery
                </button>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
