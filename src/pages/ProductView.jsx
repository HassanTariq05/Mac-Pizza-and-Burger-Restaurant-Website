import React, { useState, useEffect } from "react"
import "../css/ProductView.css"
import "../css/style.css"
import "../css/responsive.css"
import { useNavigate, useParams, Link } from "react-router-dom"
import { useStateValue } from "../components/StateProvider"
import ShopProduct from "../components/ShopProduct"
import singleProductService from "../components/singleProductService"
import { baseURL } from "../components/service"
import productService from "../components/productService"
import toast from "react-hot-toast"

const ProductView = () => {
  const { uuid, categoryUUID } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [size, setSize] = useState("") // Set initial size as empty
  const [showAdditionalPrice, setShowAdditionalPrice] = useState(false)
  const [additionalPrice, setAdditionalPrice] = useState(0)
  const [{ basket }, dispatch] = useStateValue()
  const navigate = useNavigate()
  const [stockId, setStockId] = useState(null)

  const encodedUuid = decodeURIComponent(uuid)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const params = { id: encodedUuid }
        const response = await singleProductService.getAll(params)
        setProduct(response.data.data)

        // Set the default size if stocks are available
        if (response.data.data.stocks.length > 0) {
          const defaultStock = response.data.data.stocks.find(
            (stock) => stock.is_default
          )
          if (defaultStock) {
            setStockId(defaultStock.id)
            setSize(defaultStock.extras[0].value.value) // Set the default size
            setAdditionalPrice(defaultStock.price)
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [encodedUuid])

  const [products, setProducts] = useState([])

  const [selectedAddons, setSelectedAddons] = useState([])

  const handleAddonSelect = (addon) => {
    setSelectedAddons((prevSelected) =>
      prevSelected.some((selected) => selected.id === addon.id)
        ? prevSelected.filter((selected) => selected.id !== addon.id)
        : [...prevSelected, addon]
    )
    console.log(selectedAddons)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = { id: categoryUUID }
        const response = await productService.getAll(params)
        setProducts(response.data.data)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchProducts()
  }, [categoryUUID])

  if (!product) {
    return <div>Loading...</div>
  }

  const addToBasket = () => {
    const itemIndex = basket.findIndex((item) => {
      const addonsMatch =
        item.addons && selectedAddons.length > 0
          ? item.addons.length === selectedAddons.length &&
            item.addons.every((addon, index) =>
              selectedAddons[index]
                ? addon.id === selectedAddons[index].id
                : false
            )
          : item.addons === selectedAddons ||
            (item.addons === null && selectedAddons.length === 0)

      return (
        item.title === product.translation.title &&
        item.size === size &&
        addonsMatch
      )
    })

    if (itemIndex >= 0) {
      dispatch({
        type: "UPDATE_QUANTITY",
        item: {
          title: product.translation.title,
          quantity: basket[itemIndex].quantity + quantity,
          size: size,
          addons: basket[itemIndex].addons,
        },
      })
    } else {
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          title: product.translation.title,
          image: `${baseURL}/${product.img}`,
          price: additionalPrice === 0 ? product.min_price : additionalPrice,
          description: product.translation.description,
          quantity: quantity,
          size: size,
          stockId: stockId,
          addons: selectedAddons.length > 0 ? selectedAddons : null,
        },
      })
    }

    const addonTitles = selectedAddons
      .map((addon) => addon.translation.title)
      .join(",")

    if (size === "") {
      navigate(
        `/shop/add-to-cart/${product.translation.title}/size_none/${
          addonTitles || "addon_none"
        }`
      )
    } else {
      navigate(
        `/shop/add-to-cart/${product.translation.title}/${
          size || "size_none"
        }/${addonTitles || "addon_none"}`
      )
    }
  }

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value)
    if (value >= product.min_qty && value <= product.max_qty) {
      setQuantity(value)
    }
  }

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value
    setSize(selectedSize)

    if (selectedSize === "") {
      setShowAdditionalPrice(false)
      setAdditionalPrice(0)
      setStockId(null)
    } else {
      const selectedStock = product.stocks.find(
        (stock) => stock.extras[0].value.value === selectedSize
      )
      if (selectedStock) {
        setShowAdditionalPrice(true)
        setAdditionalPrice(selectedStock.price)
        setStockId(selectedStock.id)
      } else {
        setShowAdditionalPrice(false)
        setAdditionalPrice(0)
        setStockId(null)
      }
    }
  }

  const handleAddToCartClick = () => {
    if (product.stocks.length > 1 && size === "") {
      toast.error("Select a size")
    } else if (
      product.addon_categories.length > 0 &&
      selectedAddons.length == 0
    ) {
      toast.error("Please select required addon(s)")
    } else {
      addToBasket()
    }
  }

  const price = [product.min_price, product.max_price]

  return (
    <>
      <div
        id="about-page"
        className="page-hero-section1"
        style={{ backgroundImage: 'url("")' }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="hero-txt text-center white-color">
                <div id="breadcrumb">
                  <div className="row">
                    <div className="coll">
                      <div className="breadcrumb-nav">
                        <nav aria-label="breadcrumb">
                          <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                              <Link to="/home">Home</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {product.translation.title}
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="product-view">
        <div className="product-image">
          <img
            src={`${baseURL}/${product.img}`}
            alt={product.translation.title}
          />
        </div>
        <div className="product-details">
          <h1 className="product-title">{product.translation.title}</h1>
          {Array.isArray(price) && price.length > 0 ? (
            price.length > 1 && price[0] !== price[1] ? (
              <p className="product-price">{`${parseFloat(price[0]).toFixed(
                2
              )}som-${parseFloat(price[1]).toFixed(2)}som`}</p>
            ) : (
              <p className="product-price">{`${parseFloat(price[0]).toFixed(
                2
              )}som`}</p>
            )
          ) : (
            <p className="product-price">Price not available</p>
          )}
          {product.stocks.length > 1 && (
            <div className="product-size">
              <label className="sizeLabel" htmlFor="size">
                Size
              </label>
              <select id="size" value={size} onChange={handleSizeChange}>
                <option value={"Choose an option"}>Choose an option</option>
                {product.stocks.map((stock, index) => (
                  <option key={index} value={stock.extras[0].value.value}>
                    {stock.extras[0].value.value}
                  </option>
                ))}
              </select>
              {additionalPrice !== 0 && (
                <p className="product-price">{`${additionalPrice}.00som`}</p>
              )}
            </div>
          )}

          {product.addon_categories.length > 0 && (
            <div className="adon-div">
              <div className="adon-title-div">
                <div>
                  <p className="adon-name">
                    {
                      product.addon_categories[0].addon_category.translation
                        .title
                    }
                  </p>
                  <p className="adon-desc">
                    {
                      product.addon_categories[0].addon_category.translation
                        .description
                    }
                  </p>
                </div>
                <div>
                  <p className="badge-required">Required</p>
                </div>
              </div>
              <div className="listStyle">
                {product.addon_categories.length > 0 &&
                  product.addon_categories[0].addon_category.products.map(
                    (addon, index) => {
                      const isLast =
                        index ===
                        product.addon_categories[0].addon_category.products
                          .length -
                          1

                      const isSelected = selectedAddons.some(
                        (selected) => selected.id === addon.id
                      )

                      return (
                        <div
                          key={addon.id}
                          className="addon-item"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "10px",
                            borderBottom: isLast ? "none" : "1px solid #ddd",
                          }}
                        >
                          <div
                            className="custom-checkbox-container"
                            onClick={() => handleAddonSelect(addon)}
                            style={{ marginRight: "10px", cursor: "pointer" }}
                          >
                            <input
                              type="checkbox"
                              id={`addon-${addon.id}`}
                              checked={isSelected}
                              style={{ display: "none" }}
                            />
                            <div
                              className={`custom-checkbox ${
                                isSelected ? "checked" : ""
                              }`}
                              style={{
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                border: "2px solid rgb(118, 26, 18)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: isSelected
                                  ? "rgb(118, 26, 18)"
                                  : "transparent",
                                transition: "background-color 0.3s",
                              }}
                            >
                              {isSelected && (
                                <span
                                  style={{
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                  }}
                                >
                                  ✔
                                </span>
                              )}
                            </div>
                          </div>
                          <label
                            htmlFor={`addon-${addon.id}`}
                            style={{ cursor: "pointer", margin: 0 }}
                          >
                            {addon.translation.title}
                          </label>
                        </div>
                      )
                    }
                  )}
              </div>
            </div>
          )}
          <hr className="separator-line" />

          <div className="product-quantity">
            <input
              className="qty"
              type="number"
              min={product.min_qty}
              max={product.max_qty}
              value={quantity}
              onChange={handleQuantityChange}
            />
            <button onClick={handleAddToCartClick} className="addToCart">
              <span className="flaticon-shopping-bag"></span>Add to Cart
            </button>
          </div>
          <div className="category-container">
            <div className="categoryLabel">Category:</div>
            <div className="product-category">
              {product.category.translation.title}
            </div>
          </div>
        </div>
      </div>
      <div className="related-products-section">
        <h2>Related Products</h2>
        <div className="related-products">
          {products &&
            products.map((item) => (
              <ShopProduct
                key={item.id}
                title={item.translation.title}
                description={item.translation.description}
                price={[item.min_price, item.max_price]}
                image={`${baseURL}/${item.img}`}
                quantity={item.min_qty}
                maxQuantity={item.max_qty}
                stocks={item.stocks}
                hasOption={item.stocks.length > 1 ? true : false}
                uuid={item.uuid}
                categoryUUID={categoryUUID}
              />
            ))}
        </div>
      </div>
    </>
  )
}

export default ProductView
