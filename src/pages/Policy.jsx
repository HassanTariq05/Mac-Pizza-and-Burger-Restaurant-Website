import React from "react"
import "../css/style.css"
import "../css/responsive.css"
import { Link } from "react-router-dom"

function Privacy() {
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
                <h2 style={{ textAlign: "left" }} className="h2-sm">
                  Privacy Policy
                </h2>
                <p className="p-md" style={{ textAlign: "left" }}>
                  <span style={{ fontWeight: "bold" }}>MacBurger.kg</span>{" "}
                  (“we,” “our,” or “us”) respects your privacy and is committed
                  to protecting the personal information you share with us. This
                  Privacy Policy explains how we collect, use, and safeguard
                  your information when you visit our website
                  <Link to="/">
                    <a style={{ color: "blue" }}> https://macburger.kg/</a>
                  </Link>
                  .
                </p>

                <h4>1. Information We Collect</h4>
                <p>We may collect the following types of information:</p>
                <p>
                  {" "}
                  a. Personal Information Information you voluntarily provide,
                  such as:
                </p>

                <ul>
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Delivery address</li>
                </ul>

                <p>
                  {" "}
                  b. Non-Personal Information Information collected
                  automatically, such as:
                </p>

                <ul>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Device information</li>
                </ul>

                <h4>2. How We Use Your Information</h4>
                <p>
                  We use the information collected for the following purposes:
                </p>

                <ul>
                  <li>To process and fulfill your orders.</li>
                  <li>
                    To communicate with you regarding your inquiries or support
                    requests.
                  </li>
                  <li>To improve our website and services.</li>
                  <li>To send promotional offers, if you have opted in.</li>
                  <li>To comply with legal obligations.</li>
                </ul>

                <h4>3. Cookies and Tracking Technologies</h4>
                <p>
                  We use cookies and similar technologies to enhance your
                  browsing experience. Cookies help us:
                </p>

                <ul>
                  <li>Remember your preferences.</li>
                  <li>Analyze website traffic and performance.</li>
                </ul>

                <p>
                  You can disable cookies through your browser settings, though
                  some features of the site may not function properly.
                </p>

                <h4>4. How We Share Your Information</h4>
                <p>
                  We do not sell or rent your personal information to third
                  parties. However, we may share your information with:
                </p>

                <ul>
                  <li>Delivery partners to fulfill your orders.</li>
                  <li>
                    Service providers for website hosting, analytics, or payment
                    processing.
                  </li>
                  <li>Authorities, if required by law.</li>
                </ul>

                <h4>5. Data Security</h4>
                <p>
                  We use industry-standard measures to protect your information
                  from unauthorized access, alteration, or disclosure. However,
                  no online system can be guaranteed 100% secure.
                </p>

                <h4>6. Your Rights</h4>
                <p>You have the right to:</p>

                <ul>
                  <li>Access, update, or delete your personal information.</li>
                  <li>Opt out of receiving promotional emails.</li>
                  <li>Request information about how your data is processed.</li>
                </ul>

                <p>
                  To exercise these rights, please contact us at
                  sales@macburger.kg.
                </p>

                <h4>7. Third-Party Links</h4>
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for the privacy practices or content of these
                  sites.
                </p>

                <h4>8. Children’s Privacy</h4>
                <p>
                  Our website is not intended for children under the age of 13.
                  We do not knowingly collect personal information from
                  children.
                </p>

                <h4>9. Changes to This Policy</h4>
                <p>
                  We may update this Privacy Policy from time to time. Changes
                  will be posted on this page with the updated effective date.
                </p>

                <h4>10. Contact Us</h4>
                <p>
                  If you have any questions about this Privacy Policy or how we
                  handle your information, please contact us at:
                </p>

                <p>
                  <strong> Email:</strong>{" "}
                  <span style={{ color: "blue" }}>sales@macburger.kg</span>
                </p>
                <p>
                  <strong> Phone:</strong>{" "}
                  <span style={{ color: "blue" }}>+996 700 334 433</span>
                </p>
                <p>
                  <strong> Address:</strong> 137 Yusup Abdrahmanov Str. Crossing
                  Toktogul, Bishkek, Kyrgyzstan
                </p>
                <p>Let me know if you’d like to refine this further!</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Privacy
