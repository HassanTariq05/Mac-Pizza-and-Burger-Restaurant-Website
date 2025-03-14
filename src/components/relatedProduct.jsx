import React, { useState } from "react"
import { useEffect } from "react"
import relatedProductService from "../services/api/relatedProductService"

function relatedProduct() {
  const [relatedProduct, setRelatedProduct] = useState()
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const params = { uuid: "" }
        const response = await relatedProductService.getAll(params)
        setRelatedProduct(response.data.data)
      } catch (error) {
        console.error("Error fetching product:", error)
      }
    }

    fetchProduct()
  }, [encodedUuid])
  return (
    <div>
      <h1>Related Products</h1>
    </div>
  )
}

export default relatedProduct
