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

export default function AddressModal() {
  const [open, setOpen] = useState(true)
  const [coordinates, setCoordinates] = useState({ lat: 42.8746, lng: 74.5698 }) // Default to Bishkek
  const [suggestions, setSuggestions] = useState([])
  const [searchText, setSearchText] = useState("")
  const mapRef = useRef(null)
  const searchInputRef = useRef(null)

  const initializeMap = (center) => {
    const map = new google.maps.Map(mapRef.current, {
      center,
      zoom: 14,
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

    // Create InfoWindow
    const infoWindow = new google.maps.InfoWindow({
      content: `<div style="display: flex; align-items: center; padding: 10px;">
                  <div style="margin-right: 8px;">
                    <img src="${delivery_scooter}" alt="icon" width="30" />
                  </div>
                  <div>
                    <p style="margin: 0;"><b>Bishkek</b></p>
                    <button 
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
                    </button>
                  </div>
                </div>`,
      disableAutoPan: true,
    })

    marker.addListener("dragstart", () => {
      marker.setIcon({
        url: require("../images/pin_floating.png"),
        scaledSize: new google.maps.Size(40, 60),
      })
    })

    const geocoder = new google.maps.Geocoder() // Create a Geocoder instance

    marker.addListener("dragend", () => {
      const newPos = marker.getPosition() // Get marker's new position
      const lat = newPos.lat()
      const lng = newPos.lng()

      setCoordinates({ lat, lng }) // Update state with new coordinates

      // Perform reverse geocoding to get location name
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const address = results[0].formatted_address // Get the first result's formatted address

          // Update InfoWindow content with location name
          const content = `
        <div style="display: flex; align-items: center; padding: 10px;">
          <div style="margin-right: 8px;">
            <img src="${delivery_scooter}" alt="icon" width="30" />
          </div>
          <div>
            <p style="margin: 0;"><b>${address}</b></p>
            <button 
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
            </button>
          </div>
        </div>`

          // Set InfoWindow position and content
          infoWindow.setContent(content)
          infoWindow.setPosition(newPos)
          infoWindow.open(map, marker)
        } else {
          console.error("Geocoder failed due to: " + status)
        }
      })

      // Reset marker icon to the fixed icon
      marker.setIcon({
        url: require("../images/pin_fixed.png"),
        scaledSize: new google.maps.Size(40, 50),
      })
    })

    return { map, marker, infoWindow }
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

            // Move marker and map to the new location
            map.setCenter(newCoords)
            marker.setPosition(newCoords)

            // Update InfoWindow content and position
            infoWindow.setContent(
              `<div style="display: flex; align-items: center; padding: 10px;">
                  <div style="margin-right: 8px;">
                    <img src="${delivery_scooter}" alt="icon" width="30" />
                  </div>
                  <div>
                    <p style="margin: 0;"><b>${place.formatted_address}</b></p>
                    <button 
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
                    </button>
                  </div>
                </div>`
            )
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
            return distance <= 5000
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

    const { map, marker, infoWindow } = initializeMap(coords)

    // Update InfoWindow content and position
    infoWindow.setContent(
      `<div style="display: flex; align-items: center; padding: 10px;">
        <div style="margin-right: 8px;">
          <img src="${delivery_scooter}" alt="icon" width="30" />
        </div>
        <div>
          <p style="margin: 0;"><b>${address}</b></p>
          <button 
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
          </button>
        </div>
      </div>`
    )
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
            <MDBModalBody style={{ overflowY: "auto" }}>
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
              <p className="mt-3">
                Selected Coordinates:{" "}
                <b>{`Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`}</b>
              </p>
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn type="button" onClick={() => setOpen(!open)}>
                Close
              </MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  )
}
