import React, { useEffect, useState } from "react"
import "../css/style.css"
import "../css/responsive.css"
import { Link } from "react-router-dom"
import getPrivacyPolicyService from "../services/api/getPrivacyPolicyService"

function Privacy() {
  const [data, setData] = useState()

  useEffect(() => {
    const getPrivacyPolicy = async () => {
      const privacyPolicyResponse = await getPrivacyPolicyService.get()
      setData(privacyPolicyResponse.data.data)
      console.log("Privacy Policy: ", privacyPolicyResponse.data.data)
    }

    getPrivacyPolicy()
  }, [])

  return (
    <div id="page" className="page">
      <div
        id="about-page"
        className="page-hero-section division"
        style={{ backgroundImage: 'url("")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="hero-txt text-center white-color">
                <div id="breadcrumb">
                  <div className="row">
                    <div className="col">
                      <div className="breadcrumb-nav">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <Link to="/">
                              <li className="breadcrumb-item">
                                <a href="/">Home</a>
                              </li>
                            </Link>
                            <p className="breadcrumb-item"></p>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              Privacy Policy
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
                <h2 className="h2-xl">Privacy Policy</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section id="about-3" className="wide-60 about-section division">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-lg-12">
              <div className="about-3-txt mb-40">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.translation?.description,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Privacy
