import React, { useState, useEffect } from 'react';
import categoryService from './categoryService';

function CategorySidebar({ onCategorySelect }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const params = { type: 'parent', perPage: '100' };
                const response = await categoryService.getAll(params);
                setCategories(response.data.data);
                // console.log('Category api response:', response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleCategoryClick = (uuid) => {
        onCategorySelect(uuid);
    };

    return (
        <div className="shop-sidebar">
            <div className="shop-sidebar-cats">
                <div className="shop-sidebar-cat-title active">
                    <h3>Categories</h3>
                </div>
                <div className="shop-sidebar-cat-list">
                    <ul className="list-unstyled categories-tabbing">
                        <li className="categories-tab-list active" data-tab="1">
                            <a href="javascript:;" onClick={() => handleCategoryClick("133f1e30-40b0-4305-8343-51cfb47acf6a")}>All Categories</a>
                        </li>
                        {[...categories].reverse().map((item) => (
                            <li className="categories-tab-list" data-tab={item.id} key={item.id}>
                                <a href="javascript:;" onClick={() => handleCategoryClick(item.uuid)}>{item.translation.title}</a>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
        </div>
    );
}

export default CategorySidebar;
