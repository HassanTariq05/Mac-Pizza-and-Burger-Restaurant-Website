import React from 'react';
import '../css/style.css';
import '../css/responsive.css';
import { Link } from 'react-router-dom';

const Contact = () => {
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
                                                        <li className="breadcrumb-item active" aria-current="page">CONTACT US</li>
                                                    </ol>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Page Title */}
                                <h2 className="h2-xl">CONTACT US</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Contact Banner */}
            <section id="contacts-5" className="wide-80 contacts-section division">
                <div className="container">
                    {/* Contact Info */}
                    <div className="row">
                        {/* Location */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="footer-info mb-30 text-center">
                                <h5 className="h5-md">Location</h5>
                                <p>137 Yusup Abdrahmanov Str. Crossing Toktogul, Bishkek, Kyrgyzstan</p>
                            </div>
                        </div>
                        {/* Working Schedule */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="footer-info mb-30 text-center">
                                <h5 className="h5-md">Working Schedule</h5>
                                <div className="footer-info-wrap">
                                    <h6>In Summer</h6>
                                    <p>11:00am till 02:00am Night</p>
                                </div>
                                <div className="footer-info-wrap">
                                    <h6>Delivery:</h6>
                                    <p>From 12:00pm noon- 02:00am Night</p>
                                </div>
                            </div>
                        </div>
                        {/* Order Now */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="footer-contacts mb-30 text-center">
                                <h5 className="h5-md">Order Now</h5>
                                <p className="mt-5">
                                    <span className="yellow-color">
                                        <a href="tel:+996 700 334 433">+996 700 334 433</a>
                                    </span>
                                </p>
                            </div>
                        </div>
                        {/* Follow Us */}
                        <div className="col-sm-6 col-lg-3">
                            <div className="footer-socials-links mb-30 text-center">
                                <h5 className="h5-md">Follow Us</h5>
                                <ul className="foo-socials text-center clearfix">
                                    <li>
                                        <a href="javascript:;" className="ico-facebook" aria-label="facebook">
                                            <i className="fab fa-facebook-f"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;" className="ico-instagram" aria-label="instagram">
                                            <i className="fab fa-instagram"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="row">
                        <div className="col-md-12">
                            <div id="gmap">
                                <div className="google-map">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.016660319652!2d74.6121651!3d42.87249249999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x389eb77ed773db2d%3A0x6b6bb5f70c429ae7!2sMac%20Burger%20%26%20pizza!5e0!3m2!1sen!2s!4v1711794049923!5m2!1sen!2s"
                                        width="600" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Get in Touch Title */}
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="section-title mb-40 text-center">
                                <h2 className="h2-xl">Get in Touch</h2>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="form-holder">
                                <form name="contactform" className="row contact-form" noValidate="novalidate">
                                    {/* Form Inputs */}
                                    <div className="col-md-12 col-lg-6">
                                        <input type="text" name="name" className="form-control name" placeholder="Your Name*" />
                                    </div>
                                    <div className="col-md-12 col-lg-6">
                                        <input type="email" name="email" className="form-control email" placeholder="Email Address*" />
                                    </div>
                                    <div className="col-md-12">
                                        <input type="text" name="subject" className="form-control subject" placeholder="What's this about?" />
                                    </div>
                                    <div className="col-md-12">
                                        <textarea name="message" className="form-control message" rows="6" placeholder="Your Message ..."></textarea>
                                    </div>
                                    {/* Form Button */}
                                    <div className="col-md-12 mt-5 text-right">
                                        <button type="submit" className="btn btn-md btn-red tra-red-hover submit">Send Message</button>
                                    </div>
                                    {/* Form Message */}
                                    <div className="col-md-12 contact-form-msg text-center">
                                        <div className="sending-msg"><span className="loading"></span></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
