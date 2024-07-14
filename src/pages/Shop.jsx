import React, { useState, useEffect } from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { Link } from 'react-router-dom';
import '../js/menu';
import '../js/booking-form';
import '../js/changer';
import '../js/comment-form';
import '../js/contact-form';
import '../js/jquery.scrollto';
import ShopProduct from '../components/ShopProduct';
import CategorySidebar from '../components/CategorySidebar';
import productService from '../components/productService';
import { useParams } from 'react-router-dom';
import { baseURL } from '../components/service';

function Shop() {
    const {category} = useParams();
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category || "133f1e30-40b0-4305-8343-51cfb47acf6a");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const params = { id: selectedCategory };
                const response = await productService.getAll(params);
                setProducts(response.data.data);
                console.log('Product api response:', response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchProducts();
    }, [selectedCategory]);

    console.log(selectedCategory)
    return (
        <div id="page" className="page">
            <div id="about-page" className="page-hero-section division" style={{ backgroundImage: "url('')" }}>
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
                                                        <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                                        <li className="breadcrumb-item active" aria-current="page">SHOP</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h2 className="h2-xl">SHOP</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="wide-100 Shop-page division">
                <div className="container">
                    <div className="shop-main d-flex flex-wrap">
                        <CategorySidebar onCategorySelect={setSelectedCategory} />
                        <div className="shop-content">
                            <div className="top-bar">
                                <div className="leftbox">
                                    <p>Showing 1–16 of 121 results</p>
                                </div>
                                <div className="select-wrap">
                                    <select>
                                        <option value="menu_order">Default sorting</option>
                                        <option value="popularity">Sort by popularity</option>
                                        <option value="date">Sort by latest</option>
                                        <option value="price">Sort by price: low to high</option>
                                        <option value="price-desc">Sort by price: high to low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="categories-tabbing-content">
                                <div className="categories-tab-box active" id="1">
                                    <div className="row">
                                        {products.map((item) => (
                                            <ShopProduct
                                                key={item.id}
                                                title={item.translation.title}
                                                description={item.translation.description}
                                                price={[item.min_price, item.max_price]}
                                                image={`${baseURL}/${item.img}`}
                                                quantity={item.min_qty}
                                                maxQuantity={item.max_qty}
                                                stocks={item.stocks}
                                                hasOption={(item.stocks.length > 1) ? true : false}
                                                uuid={item.uuid}
                                                categoryUUID={selectedCategory}
                                                productType={false}
                                                stockId={(item.stocks.length === 1) ? item.stocks[0].id: null}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Shop;
