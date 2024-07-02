import React, {useEffect} from 'react'
import '../css/style.css';
import '../css/responsive.css';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import '../js/menu';
import '../js/booking-form'
import '../js/changer'
import '../js/comment-form'
import '../js/contact-form'
import '../js/jquery.scrollto'
import ShopProduct from '../components/ShopProduct';

function Shop() {

  return (
    <div id="page" className="page">
        <div id="about-page" className="page-hero-section division">
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
                                                    <li className="breadcrumb-item active" aria-current="page">SHOP
                                                    </li>
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
                    <div className="shop-sidebar">
                        <div className="shop-sidebar-cats">
                            <div className="shop-sidebar-cat-title active">
                                <h3>Categories</h3>
                            </div>
                            <div className="shop-sidebar-cat-list">
                                <ul className="list-unstyled categories-tabbing">
                                    <li className="categories-tab-list active" data-tab="1">
                                        <a href="javascript:;">Breakfast</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="2">
                                        <a href="javascript:;">Burgers</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="3">
                                        <a href="javascript:;">Coffee</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="4">
                                        <a href="javascript:;">Drinks</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="5">
                                        <a href="javascript:;">Fried</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="6">
                                        <a href="javascript:;">Ice Cream</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="7">
                                        <a href="javascript:;">Indian-Pakistani Menu</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="8">
                                        <a href="javascript:;">Juices</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="9">
                                        <a href="javascript:;">Milk Shakes</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="10">
                                        <a href="javascript:;">Pizza</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="11">
                                        <a href="javascript:;">Pizza roll/Shawarma</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="12">
                                        <a href="javascript:;">Salad</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="13">
                                        <a href="javascript:;">Sauces</a>
                                    </li>
                                    <li className="categories-tab-list" data-tab="14">
                                        <a href="javascript:;">Soups</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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
                                    <ShopProduct 
                                        title={"Demo Title"}
                                        rating={4}
                                        description={"Demo Decription here"}
                                        price={"$300"}
                                        image={require("../images/breakfast-img-1.jpg")}
                                    />
                                    <ShopProduct 
                                        title={"Demo Title 2"}
                                        rating={4}
                                        description={"Demo Decription here again"}
                                        price={"$400"}
                                        image={require("../images/breakfast-img-2.jpg")}
                                    />
                                    <ShopProduct 
                                        title={"Demo Title 3"}
                                        rating={4}
                                        description={"Demo Decription here once again"}
                                        price={"$400"}
                                        image={require("../images/breakfast-img-3.jpg")}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Shop
