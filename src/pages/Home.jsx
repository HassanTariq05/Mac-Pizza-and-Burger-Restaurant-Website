import React from "react"
import "../css/style.css"
import "../css/responsive.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import categoryService from "../services/api/categoryService"
import { BASE_URL } from "../env/env"

function Home() {
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  const handleCategoryClick = (uuid) => {
    navigate(`/shop/${uuid}`)
  }

  const handleProductClick = (uuid) => {
    navigate(`/product/${uuid}`)
  }

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const params = { type: "parent", perPage: "100" }
        const response = await categoryService.getAll(params)
        setCategories(response.data.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div>
      <section id="hero-2" className="bg-fixed hero-section division">
        <div
          className="bg-fixed bg-inner division"
          style={{ backgroundImage: "url('')" }}
        >
          <div className="container">
            <div className="hero-2-txt text-center">
              <h2 className="red-color shadow-txt-white"></h2>
              <div className="hero-2-img">
                <img
                  className="img-fluid"
                  src={require("../images/hero-sec-banner-img.jpg")}
                  width="100%"
                  height="auto"
                  alt="hero-image"
                />
                <div
                  className="price-badge-sm bg-fixed white-color1"
                  style={{
                    backgroundImage:
                      "url('https://macburger.kg/wp-content/uploads/2024/02/price-badge-yellow.png')",
                  }}
                >
                  <div className="badge-txt">
                    <h5 className="h5-md">From</h5>
                    <h4 className="h4-lg">₽6.99</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-fixed white-overlay-wave"></div>
        </div>
      </section>

      <section
        id="menu-8"
        className="wide-70 menu-section division h-categories"
      >
        <div className="container">
          <div id="tabs-nav" className="mb-0">
            <div className="row">
              <div className="col-lg-12 text-center">
                <ul className="tabs-1 ico-55 red-tabs clearfix">
                  {[...categories].reverse().map((item) => (
                    <li className="tab-link">
                      <a onClick={() => handleCategoryClick(item.uuid)}>
                        <img
                          style={{
                            maxWidth: "54px",
                            maxHeight: "54px",
                            scale: "inherit",
                          }}
                          className="category-img"
                          src={`${BASE_URL}/${item.img}`}
                          alt="vector"
                        />
                        <h5>{item.translation.title}</h5>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="promo-11" className="bg-fixed promo-section division">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-5 col-lg-4">
              <div className="pbox-11-txt mb-40 white-color">
                <h3 className="h3-lg">The</h3>
                <h2>County General</h2>
                <a
                  onClick={() =>
                    handleCategoryClick("bc25c7cd-ed84-4626-8f6b-897476ca2a29")
                  }
                  className="btn btn-lg btn-red tra-white-hover"
                >
                  Order Now
                </a>
              </div>
            </div>
            <div className="col-md-7 col-lg-6">
              <div className="pbox-11-img mb-40">
                <img
                  className="img-fluid"
                  src={require("../images/pizza-banner-removebg-preview.png")}
                  alt="promo-image"
                />
                <div className="red-badge price-badge-lg bg-fixed">
                  <div className="badge-txt white-color">
                    <h5 className="h5-xl">Only</h5>
                    <h3 className="h3-sm">170.00SOM</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2">
              <div className="pbox-11-link text-center white-color">
                <a
                  onClick={() =>
                    handleProductClick(
                      "06cea71c-6e22-4383-9bd0-9c219df7c52c/bc25c7cd-ed84-4626-8f6b-897476ca2a29"
                    )
                  }
                >
                  <img
                    className="img-fluid"
                    src={require("../images/central-banner-pizza-1.png")}
                    alt="promo-image"
                  />
                  <p>POLO VEGGIE PIZZA</p>
                </a>
              </div>
              <div className="pbox-11-link text-center mb-40 white-color">
                <a
                  onClick={() =>
                    handleProductClick(
                      "66d2b9a2-6a4a-4c8f-92a5-02a55648f683/bc25c7cd-ed84-4626-8f6b-897476ca2a29"
                    )
                  }
                >
                  <img
                    className="img-fluid"
                    src={require("../images/central-banner-pizza-2.png")}
                    alt="promo-image"
                  />
                  <p>HAWAIIAN PIZZA</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="promo-3" className="promo-section division wide-50">
        <div className="container">
          <div className="row d-flex align-items-center">
            <div className="col-md-6">
              <a
                onClick={() =>
                  handleCategoryClick("bc25c7cd-ed84-4626-8f6b-897476ca2a29")
                }
              >
                <div className="pbox-3 mb-30">
                  <div className="hover-overlay">
                    <img
                      className="img-fluid"
                      src={require("../images/promo-3-sec-img-1.webp")}
                      alt="promo-image"
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a
                onClick={() =>
                  handleCategoryClick("440bc746-1209-402e-a578-ed5f92ba41f6")
                }
              >
                <div className="pbox-3 mb-30">
                  <div className="hover-overlay">
                    <img
                      className="img-fluid"
                      src={require("../images/promo-3-sec-img-2.webp")}
                      alt="promo-image"
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a
                onClick={() =>
                  handleCategoryClick("5ad41a79-b6ce-4c55-beb0-67faa31821cd")
                }
              >
                <div className="pbox-3">
                  <div className="hover-overlay">
                    <img
                      className="img-fluid"
                      src={require("../images/promo-3-sec-img-3.webp")}
                      alt="promo-image"
                    />
                  </div>
                </div>
              </a>
            </div>
            <div className="col-md-6">
              <a
                onClick={() =>
                  handleCategoryClick("bc25c7cd-ed84-4626-8f6b-897476ca2a29")
                }
              >
                <div className="pbox-3 pbox-3-last">
                  <div className="hover-overlay">
                    <img
                      className="img-fluid"
                      src={require("../images/promo-3-sec-img-4.webp")}
                      alt="promo-image"
                    />
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
