import React, { useState, useEffect } from "react"
import categoryService from "../services/api/categoryService"

function CategorySidebar({ onCategorySelect }) {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const params = { type: "parent", perPage: "100" }
        const response = await categoryService.getAll(params)
        const sortedCategories = response.data.data.sort(
          (a, b) => a.sort - b.sort
        )
        setCategories(sortedCategories)

        if (sortedCategories.length > 0) {
          handleCategoryClick(sortedCategories[0].uuid)
        }
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryClick = (uuid) => {
    onCategorySelect(uuid)
  }

  return (
    <div className="shop-sidebar">
      <div className="shop-sidebar-cats">
        <div className="shop-sidebar-cat-title active">
          <h3>Categories</h3>
        </div>
        <div className="shop-sidebar-cat-list">
          <ul className="list-unstyled categories-tabbing">
            {[...categories].map((item) => (
              <li
                className="categories-tab-list"
                data-tab={item.id}
                key={item.id}
              >
                <a onClick={() => handleCategoryClick(item.uuid)}>
                  {item.translation.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default CategorySidebar
