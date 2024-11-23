import React from "react"
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit"
import "../css/OrderProgressBar.css"

export default function OrderProgressBar({ orderNo, status }) {
  return (
    <>
      <section className="vh-50" style={{ backgroundColor: "#fff" }}>
        <MDBContainer className="py-2 h-100" style={{ maxWidth: "830px" }}>
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol size="12">
              <MDBCard
                className="card-stepper text-black"
                style={{
                  borderRadius: "8px",
                  border: "1px solid rgb(239, 240, 246)",
                }}
              >
                <MDBCardBody className="p-5">
                  <div className="d-flex justify-content-between align-items-center mb-5">
                    <div>
                      <MDBTypography tag="h5" className="mb-0">
                        Order Status
                      </MDBTypography>
                    </div>
                    <div className="text-end">
                      <MDBTypography tag="h5" className="mb-0">
                        Order{" "}
                        <span className="text-colored font-weight-bold">
                          #{orderNo}
                        </span>
                      </MDBTypography>
                    </div>
                  </div>
                  <ul
                    id="progressbar-2"
                    className="d-flex justify-content-between mx-0 mt-0 mb-4 px-0 pt-0 pb-2"
                  >
                    {status == "new" && (
                      <>
                        <li
                          className="step0 active text-center"
                          id="step1"
                        ></li>
                        <li className="step0  text-center" id="step2"></li>
                        <li className="step0  text-center" id="step3"></li>
                        <li className="step0  text-center" id="step4"></li>
                      </>
                    )}

                    {status == "accepted" && (
                      <>
                        <li
                          className="step0 active text-center"
                          id="step1"
                        ></li>
                        <li
                          className="step0  active text-center"
                          id="step2"
                        ></li>
                        <li className="step0  text-center" id="step3"></li>
                        <li className="step0  text-center" id="step4"></li>
                      </>
                    )}

                    {status == "on_a_way" && (
                      <>
                        <li
                          className="step0 active text-center"
                          id="step1"
                        ></li>
                        <li
                          className="step0  active text-center"
                          id="step2"
                        ></li>
                        <li
                          className="step0  active text-center"
                          id="step3"
                        ></li>
                        <li className="step0  text-center" id="step4"></li>
                      </>
                    )}

                    {status == "delivered" && (
                      <>
                        <li
                          className="step0 active text-center"
                          id="step1"
                        ></li>
                        <li
                          className="step0  active text-center"
                          id="step2"
                        ></li>
                        <li
                          className="step0 active text-center"
                          id="step3"
                        ></li>
                        <li
                          className="step0 active text-center"
                          id="step4"
                        ></li>
                      </>
                    )}

                    {status == "canceled" && <span>Order Canceled</span>}
                    {status == "pause" && <span>Order Paused</span>}
                  </ul>

                  <div className="d-flex justify-content-between">
                    <div className="d-flex flex-column align-items-center">
                      <MDBIcon
                        fas
                        icon="clipboard-list"
                        size="2x"
                        className="mb-2"
                      />
                      <p className="fw-bold mb-0">Placed</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <MDBIcon
                        fas
                        icon="clipboard-check"
                        size="2x"
                        className="mb-2"
                      />
                      <p className="fw-bold mb-0">Accepted</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <MDBIcon fas icon="road" size="2x" className="mb-2" />
                      <p className="fw-bold mb-0">On the Way</p>
                    </div>
                    <div className="d-flex flex-column align-items-center">
                      <MDBIcon
                        fas
                        icon="check-double"
                        size="2x"
                        className="mb-2"
                      />
                      <p className="fw-bold mb-0">Delivered</p>
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </>
  )
}
