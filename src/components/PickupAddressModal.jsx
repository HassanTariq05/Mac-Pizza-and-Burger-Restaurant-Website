import React, { useEffect, useState } from "react"
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBIcon,
} from "mdb-react-ui-kit"
import "../css/DeliveryTypeModal.css"
import "../css/AddressModal.css"
import getDeliveryPoints from "./getDeliveryPoints"
import toast from "react-hot-toast"

export default function PickupAddressModal({
  isOpen,
  onPickupAddressModalClose,
}) {
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  const handleCloseModal = () => {
    onPickupAddressModalClose()
  }

  const handleAddressClick = (address) => {
    setSelectedAddress(address.id)
    localStorage.setItem("deliveryType", "pickup")
    localStorage.setItem("deliveryPointId", address.id)
    localStorage.setItem("currentAddress", address.address.en)
    onPickupAddressModalClose()
    toast.success("Pickup Location Selected")
  }

  useEffect(() => {
    const getPointsAddresses = async () => {
      const getDeliveryPointsResponse = await getDeliveryPoints.get()
      setAddresses(getDeliveryPointsResponse.data.data)
    }

    getPointsAddresses()
  }, [])

  return (
    <MDBModal open={isOpen} tabIndex={-1}>
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Select Pickup Location</MDBModalTitle>
            <MDBIcon
              icon="times"
              size="1x"
              color="none"
              onClick={handleCloseModal}
              style={{ cursor: "pointer" }}
            />
          </MDBModalHeader>
          <MDBModalBody>
            <div className="address-container" style={containerStyle}>
              <div style={listStyle}>
                {addresses.length > 0 &&
                  addresses.map((address, index) => {
                    const isLast = index === addresses.length - 1

                    return (
                      <div
                        key={address.id}
                        className="address-item"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px",
                          borderBottom: isLast ? "none" : "1px solid #ddd",
                          cursor: "pointer",
                        }}
                        onClick={() => handleAddressClick(address)}
                      >
                        <div
                          style={{
                            width: "20px",
                            height: "20px",
                            borderRadius: "50%",
                            border: "2px solid rgb(118, 26, 18)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginRight: "10px",
                            cursor: "pointer",
                          }}
                        >
                          {selectedAddress === address.id && (
                            <div
                              style={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "rgb(118, 26, 18)",
                              }}
                            ></div>
                          )}
                        </div>
                        <p style={{ margin: 0 }}>{address.address.en}</p>
                      </div>
                    )
                  })}
              </div>
            </div>
          </MDBModalBody>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  )
}

const containerStyle = {
  flex: 1,
  width: "100%",
  padding: "10px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  maxHeight: "100%",
}

const listStyle = {
  maxWidth: "100%",
  maxHeight: "calc(100vh - 150px)",
  overflowY: "auto",
  paddingRight: "10px",
  scrollbarWidth: "thin",
}
