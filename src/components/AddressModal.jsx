/* global google */
import React, { useEffect, useRef, useState } from "react"
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBIcon,
  MDBInput,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit"
import { Loader } from "@googlemaps/js-api-loader"
import { GOOGLE_MAPS_API_KEY } from "./service"
import delivery_scooter from "../images/delivery-scooter.png"
import deliveryPriceService from "./deliveryPriceService"
import { useAsyncError } from "react-router-dom"
import "../css/AddressModal.css"

export default function AddressModal() {
  const [open, setOpen] = useState(true)
  const [coordinates, setCoordinates] = useState({ lat: 42.8746, lng: 74.5698 })
  const [orginCoordinates, setOriginCoordinates] = useState()
  const [suggestions, setSuggestions] = useState([])
  const [searchText, setSearchText] = useState("")
  const mapRef = useRef(null)
  const searchInputRef = useRef(null)
  const [maxDeliveryDistance, setMaxDeliveryDistance] = useState()

  useEffect(() => {
    const getDeliveryDistance = async () => {
      const getDeliveryDistanceResponse = await deliveryPriceService.getPrice()

      const distances = getDeliveryDistanceResponse.data.data

      const maxDistanceObj = distances.reduce((maxObj, item) => {
        return item.max_distance_km > (maxObj?.max_distance_km || 0)
          ? item
          : maxObj
      }, null)

      const max_distance_m = maxDistanceObj.max_distance_km * 1000
      console.log("Maximum Delivery Distance in meters:", max_distance_m)
      setMaxDeliveryDistance(max_distance_m)
      setCoordinates({
        lat: maxDistanceObj.shop.lat_long.latitude,
        lng: maxDistanceObj.shop.lat_long.longitude,
      })
      setOriginCoordinates({
        lat: maxDistanceObj.shop.lat_long.latitude,
        lng: maxDistanceObj.shop.lat_long.longitude,
      })
    }
    getDeliveryDistance()
  }, []) // This effect fetches the delivery distance only once

  useEffect(() => {
    if (open && maxDeliveryDistance && orginCoordinates) {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
        version: "weekly",
      })

      loader.load().then(() => {
        const { map, marker, infoWindow } = initializeMap(coordinates)

        const circle = new google.maps.Circle({
          center: { lat: coordinates.lat, lng: coordinates.lng },
          radius: 5000, // Radius in meters
        })

        const autocomplete = new google.maps.places.Autocomplete(
          searchInputRef.current,
          {
            fields: ["geometry", "formatted_address"],
            types: ["address"],
          }
        )

        autocomplete.setBounds(circle.getBounds())
        autocomplete.setOptions({ strictBounds: true })

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          if (place.geometry) {
            const newCoords = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }

            setCoordinates(newCoords)
            const distance = calculateDistance(newCoords, orginCoordinates)

            const message =
              distance <= maxDeliveryDistance
                ? `<button 
                      style="
                        background: none;
                        border: none;
                        color: red;
                        font-size: 12px;
                        font-weight: bold;
                        text-decoration: none;
                        cursor: pointer;"
                      onclick="alert('Point confirmed!')"
                    >
                      Use this point
                    </button>`
                : `<p style="margin: 0; color: gray; font-size: 12px; font-weight: bold;">We don't deliver here</p>`

            const content = `
              <div style="display: flex; align-items: center; padding: 10px;">
                <div style="margin-right: 8px;">
                  <img src="${delivery_scooter}" alt="icon" width="30" />
                </div>
                <div>
                  <p style="margin: 0;"><b>${place.formatted_address}</b></p>
                  ${message}
                </div>
              </div>`

            infoWindow.setContent(content)
            infoWindow.open(map, marker)
          }
        })
      })
    }
  }, [open, maxDeliveryDistance, orginCoordinates])

  const initializeMap = (center) => {
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 18,
    })

    const marker = new google.maps.Marker({
      position: center,
      map,
      draggable: true,
      crossOnDrag: false,
      icon: {
        url: require("../images/pin_fixed.png"),
        scaledSize: new google.maps.Size(40, 50),
      },
    })

    const infoWindow = new google.maps.InfoWindow({ disableAutoPan: true })

    const geocoder = new google.maps.Geocoder()
    const generateInfoWindowContent = (address, distance) => {
      const withinDeliveryRange = distance <= maxDeliveryDistance

      return `
        <div style="display: flex; align-items: center; padding: 10px;">
          <div style="margin-right: 8px;">
            <img src="${delivery_scooter}" alt="icon" width="30" />
          </div>
          <div>
            <p style="margin: 0;"><b>${address || "Unknown Location"}</b></p>
            ${
              withinDeliveryRange
                ? `<button 
                    style="
                      background: none;
                      border: none;
                      color: red;
                      font-size: 12px;
                      font-weight: bold;
                      text-decoration: none;
                      cursor: pointer;"
                    onclick="alert('Point confirmed!')"
                  >
                    Use this point
                  </button>`
                : `<p style="margin: 0; color: gray; font-size: 12px; font-weight: bold;">We don't deliver here</p>`
            }
          </div>
        </div>`
    }

    // Handle marker drag events
    marker.addListener("dragstart", () => {
      marker.setIcon({
        url: require("../images/pin_floating.png"),
        scaledSize: new google.maps.Size(40, 60),
      })
    })

    marker.addListener("dragend", () => {
      const newPos = marker.getPosition()
      const lat = newPos.lat()
      const lng = newPos.lng()
      setCoordinates({ lat, lng })

      const distance = calculateDistance({ lat, lng }, orginCoordinates)

      // Reverse geocode to get address
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address
          const content = generateInfoWindowContent(address, distance)

          infoWindow.setContent(content)
          infoWindow.setPosition(newPos)
          infoWindow.open(map, marker)
        } else {
          console.error("Geocoder failed:", status)
          infoWindow.setContent(
            `<p style="color: red; font-weight: bold;">Unable to fetch location details</p>`
          )
          infoWindow.open(map, marker)
        }
      })

      marker.setIcon({
        url: require("../images/pin_fixed.png"),
        scaledSize: new google.maps.Size(40, 50),
      })
    })

    return { map, marker, infoWindow }
  }

  // Function to calculate the distance between two coordinates
  const calculateDistance = (coord1, coord2) => {
    if (!coord1 || !coord2) return Infinity

    const R = 6371e3 // Earth's radius in meters
    const lat1 = (coord1.lat * Math.PI) / 180
    const lat2 = (coord2.lat * Math.PI) / 180
    const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180
    const deltaLng = ((coord2.lng - coord1.lng) * Math.PI) / 180

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c // Distance in meters
  }

  useEffect(() => {
    if (open) {
      const loader = new Loader({
        apiKey: GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
        version: "weekly",
      })

      loader.load().then(() => {
        // Define map options, including center and zoom
        const mapOptions = {
          center: { lat: coordinates.lat, lng: coordinates.lng }, // Set initial center
          zoom: 12, // Adjust zoom level
        }

        // Initialize map, marker, and infoWindow
        const { map, marker, infoWindow } = initializeMap(coordinates)

        // Define a circular radius using LatLngBounds for Autocomplete
        const circle = new google.maps.Circle({
          center: { lat: coordinates.lat, lng: coordinates.lng }, // Center for the radius
          radius: 5000, // Radius in meters (5km in this case)
        })

        const autocomplete = new google.maps.places.Autocomplete(
          searchInputRef.current,
          {
            fields: ["geometry", "formatted_address"],
            types: ["address"],
          }
        )

        // Restrict autocomplete results to within the circle
        autocomplete.setBounds(circle.getBounds())
        autocomplete.setOptions({ strictBounds: true }) // Enforce strict bounds (optional)

        // Handle place selection in Autocomplete
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          if (place.geometry) {
            const newCoords = {
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
            }

            setCoordinates(newCoords) // Update coordinates in state
            const distance = calculateDistance(newCoords, orginCoordinates)

            // Move marker and map to the new location
            map.setCenter(newCoords)
            marker.setPosition(newCoords)

            const message =
              distance <= maxDeliveryDistance
                ? `<button 
                      style="
                        background: none;
                        border: none;
                        color: red;
                        font-size: 12px;
                        font-weight: bold;
                        text-decoration: none;
                        cursor: pointer;"
                      onclick="alert('Point confirmed!')"
                    >
                      Use this point
                    </button>`
                : `<p style="margin: 0; color: gray; font-size: 12px; font-weight: bold;">We don't deliver here</p>`

            const content = `
              <div style="display: flex; align-items: center; padding: 10px;">
                <div style="margin-right: 8px;">
                  <img src="${delivery_scooter}" alt="icon" width="30" />
                </div>
                <div>
                  <p style="margin: 0;"><b>${place.formatted_address}</b></p>
                  ${message}
                </div>
              </div>`

            // Set InfoWindow position and content
            infoWindow.setContent(content)

            // // Update InfoWindow content and position
            // infoWindow.setContent(
            //   `<div style="display: flex; align-items: center; padding: 10px;">
            //       <div style="margin-right: 8px;">
            //         <img src="${delivery_scooter}" alt="icon" width="30" />
            //       </div>
            //       <div>
            //         <p style="margin: 0;"><b>${place.formatted_address}</b></p>
            //         <button
            //           style="
            //             background: none;
            //             border: none;
            //             color: red;
            //             font-size: 12px;
            //             font-weight: bold;
            //             text-decoration: none;
            //             cursor: pointer;"
            //           onclick="alert('Point confirmed!')"
            //         >
            //           Use this point
            //         </button>
            //       </div>
            //     </div>`
            // )
            infoWindow.open(map, marker)
          }
        })
      })
    }
  }, [open])

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchText(query)

    if (query.length > 2) {
      const service = new google.maps.places.PlacesService(mapRef.current)
      const request = {
        query,
        fields: ["place_id", "formatted_address", "geometry"],
        location: new google.maps.LatLng(coordinates.lat, coordinates.lng),
        radius: 5000,
      }

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          const filteredResults = results.filter((result) => {
            const resultLocation = result.geometry.location
            const distance =
              google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(coordinates.lat, coordinates.lng),
                resultLocation
              )
            return distance <= 20000
          })

          setSuggestions(filteredResults)
        } else {
          setSuggestions([])
        }
      })
    } else {
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (address, coords) => {
    setSearchText(address)
    setCoordinates(coords)
    setSuggestions([])

    // Initialize map components with the selected coordinates
    const { map, marker, infoWindow } = initializeMap(coords)

    // Calculate the distance to check if it is within the delivery radius
    const distance = calculateDistance(coords, orginCoordinates)

    // Determine the message based on the delivery distance
    const message =
      distance <= maxDeliveryDistance
        ? `<button 
              style="
                background: none;
                border: none;
                color: red;
                font-size: 12px;
                font-weight: bold;
                text-decoration: none;
                cursor: pointer;"
              onclick="alert('Point confirmed!')"
            >
              Use this point
            </button>`
        : `<p style="margin: 0; color: gray; font-size: 12px; font-weight: bold;">We don't deliver here</p>`

    // Set InfoWindow content and position
    const content = `
      <div style="display: flex; align-items: center; padding: 10px;">
        <div style="margin-right: 8px;">
          <img src="${delivery_scooter}" alt="icon" width="30" />
        </div>
        <div>
          <p style="margin: 0;"><b>${address}</b></p>
          ${message}
        </div>
      </div>`

    infoWindow.setContent(content)
    infoWindow.open(map, marker)
  }

  return (
    <>
      <MDBBtn onClick={() => setOpen(!open)}>LAUNCH DEMO MODAL</MDBBtn>
      <MDBModal open={open} setOpen={setOpen} tabIndex={-1}>
        <MDBModalDialog style={{ maxWidth: "80%", height: "90%" }}>
          <MDBModalContent style={{ height: "100%" }}>
            <MDBModalHeader>
              <MDBModalTitle>Delivery Address</MDBModalTitle>
              <div style={{ display: "flex", gap: "60px" }}>
                <MDBInput
                  ref={searchInputRef}
                  type="text"
                  value={searchText}
                  onChange={handleSearchChange}
                  className="form-control mx-5"
                  style={{ flex: 1 }}
                />
                <MDBIcon
                  icon="times"
                  size="1x"
                  color="none"
                  onClick={() => setOpen(!open)}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </MDBModalHeader>
            <MDBModalBody style={{ overflowY: "auto", height: "380px" }}>
              {suggestions.length > 0 && (
                <MDBListGroup className="mt-3">
                  {suggestions.map((suggestion) => (
                    <MDBListGroupItem
                      key={suggestion.place_id}
                      onClick={() =>
                        handleSuggestionClick(suggestion.formatted_address, {
                          lat: suggestion.geometry.location.lat(),
                          lng: suggestion.geometry.location.lng(),
                        })
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {suggestion.formatted_address}
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              )}

              <div
                ref={mapRef}
                style={{ height: "400px", width: "100%" }}
              ></div>
            </MDBModalBody>

            <MDBModalFooter style={{ height: "100px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <div>
                  <h5>What kind of place is this?</h5>
                </div>
                <div className="res-btns">
                  <button className="icon-button-1">
                    <span className="icon-1">
                      <i className="fas fa-home"></i>
                    </span>
                    <span className="text-1">Home</span>
                  </button>
                  <button className="icon-button-1">
                    <span className="icon-1">
                      <i className="fas fa-building"></i>
                    </span>
                    <span className="text-1">Apartment</span>
                  </button>
                  <button className="icon-button-1">
                    <span className="icon-1">
                      <i className="fas fa-briefcase"></i>
                    </span>
                    <span className="text-1">Office</span>
                  </button>
                  <button className="icon-button-1">
                    <span className="icon-1">
                      <i className="fas fa-ellipsis-h"></i>
                    </span>
                    <span className="text-1">Other</span>
                  </button>
                </div>
              </div>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
