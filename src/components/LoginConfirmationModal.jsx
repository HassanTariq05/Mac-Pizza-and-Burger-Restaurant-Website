import { useState } from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

function LoginConfirmationModal({ show, onClose, onLogin }) {
  return (
    <>
      <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Login to Continue</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          To place an order, please log in to your account. Click the 'Login'
          button to proceed.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button color="brown" variant="primary" onClick={onLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default LoginConfirmationModal
