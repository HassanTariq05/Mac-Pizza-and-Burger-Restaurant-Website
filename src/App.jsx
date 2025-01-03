import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import About from "./pages/About"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import Contact from "./pages/Contact"
import Cart from "./pages/Cart"
import DocumentTitle from "./components/DocumentTitle"
import { useStateValue } from "./components/StateProvider"
import ScrollToTop from "./components/ScrollToTop"
import ProductView from "./pages/ProductView"
import AddToCartReceipt from "./pages/AddtoCartReceipt"
import ProductCheckout from "./pages/ProductCheckout"
import Orders from "./pages/Orders"
import "./css/bootstrap.min.css"
import "./css/flaticon.css"
import "./css/menu.css"
import "./css/magnific-popup.css"
import "./css/flexslider.css"
import "./css/owl.carousel.min.css"
import "./css/owl.theme.default.min.css"
import "./css/jquery.datetimepicker.min.css"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword"
import Otp from "./pages/Otp"
import { Toaster } from "react-hot-toast"
import UserProfile from "./pages/UserProfile"
import PersonalData from "./pages/PersonalData"
import AllOrders from "./pages/AllOrders"
import OrderDetail from "./pages/OrderDetail"
import AddressModal from "./components/AddressModal"
import useUser from "./components/useUser"
import ProtectedRoute from "./components/ProtectedRoute"
import DeliveryTypeModal from "./components/DeliveryTypeModal"
import Privacy from "./pages/Policy"
import { useState } from "react"
import PickupAddressModal from "./components/PickupAddressModal"

function MainContent() {
  const location = useLocation()
  const navigate = useNavigate()
  const [showPopup, setShowPopup] = useState(false)
  const [AddressModalOpen, setAddressModalOpen] = useState(false)
  const [DeliveryTypeModalOpen, setDeliveryTypeModalOpen] = useState(true)
  const [PickupAddressModalOpen, setPickupAddressModalOpen] = useState(false)

  const onClose = () => {
    setAddressModalOpen(false)
  }

  const onDeliveryTypeModalClose = () => {
    setDeliveryTypeModalOpen(false)
  }

  const onPickupAddressModalClose = () => {
    setPickupAddressModalOpen(false)
  }

  const handleAddressModalOpen = () => {
    setAddressModalOpen(true)
  }

  const onDeliveryButtonClick = () => {
    onDeliveryTypeModalClose()
    handleAddressModalOpen()
  }

  const onPickupButtonClick = () => {
    onDeliveryTypeModalClose()
    setPickupAddressModalOpen(true)
  }

  const handleDeliveryTypeModalOpen = () => {
    setDeliveryTypeModalOpen(true)
  }

  useEffect(() => {
    const handleStorageChange = () => {
      if (localStorage.length === 0 || !localStorage.getItem("someKey")) {
        navigate("/")
      }
    }

    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [navigate])

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("isFirstVisit")
    if (!isFirstVisit) {
      setShowPopup(true)
      localStorage.setItem("isFirstVisit", "false")
    }
  }, [])

  const skipHeaderFooter =
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/reset-password" ||
    location.pathname === "/otp-verification"

  return (
    <>
      {!skipHeaderFooter && <Header />}
      <ScrollToTop />
      <Toaster />
      <DocumentTitle />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/demo" element={<DeliveryTypeModal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verification/:email" element={<Otp />} />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute allowedForGuests={false}>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile/personal-data"
          element={
            <ProtectedRoute allowedForGuests={false}>
              <PersonalData />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<ProductCheckout />} />
        <Route
          path="/orders"
          element={
            <ProtectedRoute allowedForGuests={false}>
              <AllOrders />
            </ProtectedRoute>
          }
        />
        <Route path="/order/:id" element={<Orders />} />
        <Route
          path="/orders/order-detail/:id"
          element={
            <ProtectedRoute allowedForGuests={false}>
              <OrderDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop/add-to-cart/:title/:size/:addonTitles"
          element={<AddToCartReceipt />}
        />

        <Route path="/product/:uuid/:categoryUUID" element={<ProductView />} />
        <Route path="/product/:uuid" element={<ProductView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!skipHeaderFooter && <Footer />}
      {showPopup && (
        <>
          <AddressModal isOpen={AddressModalOpen} onClose={onClose} />
          <DeliveryTypeModal
            isOpen={DeliveryTypeModalOpen}
            onDeliveryTypeModalClose={onDeliveryTypeModalClose}
            onDeliveryButtonClick={onDeliveryButtonClick}
            onPickupButtonClick={onPickupButtonClick}
          />
          <PickupAddressModal
            isOpen={PickupAddressModalOpen}
            onPickupAddressModalClose={onPickupAddressModalClose}
          />
        </>
      )}
    </>
  )
}

function App() {
  const [{ basket }, dispatch] = useStateValue()

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket))
  }, [basket])

  useEffect(() => {
    const verifyUser = () => {
      const token = localStorage.getItem("token")
      if (!token) {
        localStorage.setItem("isGuestUser", "true")
      }
    }
    verifyUser()
  }, [])

  return (
    <Router basename="/">
      <MainContent />
    </Router>
  )
}

export default App
