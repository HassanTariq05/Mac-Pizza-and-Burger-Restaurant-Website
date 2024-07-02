import React from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { Link } from 'react-router-dom';
import CartProduct from '../components/CartProduct';

const Cart = () => {
    return (
        <div id="page" className="page">
            {/* About Banner */}
            <div id="about-page" className="page-hero-section division" style={{ backgroundImage: "url('')" }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="hero-txt text-center white-color">
                                {/* Breadcrumb */}
                                <div id="breadcrumb">
                                    <div className="row">
                                        <div className="col">
                                            <div className="breadcrumb-nav">
                                                <nav aria-label="breadcrumb">
                                                    <ol className="breadcrumb">
                                                        <li className="breadcrumb-item"><Link to='/home'>Home</Link></li>
                                                        <li className="breadcrumb-item active" aria-current="page">CART</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Page Title */}
                                <h2 className="h2-xl">CART</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Cart Page */}
            <section id="cart-1" className="wide-100 cart-page division">
                <div className="container">
                    {/* Cart Table */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="cart-table mb-70">
                                <table id="myTable">
                                    <thead>
                                        <tr>
                                            <th scope="col">Product</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Cart Items */}
                                        <CartProduct
                                        title={"Cart Product Title"}
                                        price={"$300"}
                                        image={require("../images/breakfast-img-3.jpg")}
                                        description={"Cart Product Description here"}
                                        />

                                        <CartProduct
                                        title={"Cart Product Title 2"}
                                        price={"$400"}
                                        image={require("../images/breakfast-img-4.jpg")}
                                        description={"Cart Product Description here again"}
                                        />
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Cart Checkout */}
                    <div className="row">
                        {/* Discount Coupon */}
                        <div className="col-lg-8">
                            <div className="discount-coupon row pt-15">
                                <div className="col-md-8 col-lg-7">
                                    <form className="discount-form">
                                        <div className="input-group">
                                            <input type="text" className="form-control" placeholder="Coupon Code" id="discount-code" />
                                            <span className="input-group-btn">
                                                <button type="submit" className="btn btn-salmon tra-salmon-hover">Apply Coupon</button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-md-4 col-lg-5 text-right">
                                    <button onClick={() => window.location.reload()} className="btn btn-md btn-salmon tra-salmon-hover">Update Cart</button>
                                </div>
                            </div>
                        </div>
                        {/* Checkout */}
                        <div className="col-lg-4">
                            <div className="cart-checkout bg-lightgrey">
                                <h5 className="h5-lg">Cart Total</h5>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Subtotal</td>
                                            <td></td>
                                            <td className="text-right">$35.95</td>
                                        </tr>
                                        <tr className="last-tr">
                                            <td>Total</td>
                                            <td></td>
                                            <td className="text-right">$35.95</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <a href="#" className="btn btn-md btn-salmon tra-salmon-hover">Proceed To Checkout</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Cart;
