import React from 'react'
import { Link } from 'react-router-dom';

const FooterSection3 = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer className="fz-3-footer-section">
        <div className="fz-3-footer-top">
            <div className="container">
                <div className="row gy-5 justify-content-center justify-content-xxl-between">
                    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
                        <div className="fz-3-footer__contact-info">
                            <h5 className="fz-3-footer-widget__title">Contact Us</h5>
                            <ul>
                                <li>
                                    <Link href="#"><i className="fa-light fa-location-dot"></i> 16 Rr 2, Ketchikan, Alaska 99901, USA</Link>
                                </li>
                                <li>
                                    <Link href="#"><i className="fa-light fa-phone"></i> (907) 225-4144</Link>
                                </li>
                                <li>
                                    <Link href="#"><i className="fa-light fa-envelope-open-text"></i> randomemail@gmail.com</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
                        <div className="fz-3-footer-widget">
                            <h5 className="fz-3-footer-widget__title">Customer Service</h5>
                            <ul>
                                <li><Link href="#">Shipping and Returns</Link></li>
                                <li><Link href="#">Product Care</Link></li>
                                <li><Link href="#">Returns & Policy</Link></li>
                                <li><Link href="#">Warranty & Lifetime Service</Link></li>
                                <li><Link href="#">Jewelry Care Instruction</Link></li>
                                <li><Link href="/faq">FAQ</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
                        <div className="fz-3-footer-widget">
                            <h5 className="fz-3-footer-widget__title">Quick Links</h5>
                            <ul>
                                <li><Link href="/about">Our Story</Link></li>
                                <li><Link href="/blog">Blog & Press</Link></li>
                                <li><Link href="#">Order History</Link></li>
                                <li><Link href="#">Wish List</Link></li>
                                <li><Link href="#">Terms & Conditions</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-6 col-xxs-12">
                        <div className="fz-3-footer-widget">
                            <h5 className="fz-3-footer-widget__title">Ways to Shop</h5>
                            <ul>
                                <li><Link href="#">Shop on Facebook</Link></li>
                                <li><Link href="#">Shop on Ebay</Link></li>
                                <li><Link href="#">Shop by Category</Link></li>
                                <li><Link href="/shop">Shop All</Link></li>
                                <li><Link href="#">Coupons and Discounts</Link></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-xxl-3 col-xl-5 col-lg-5 col-md-8 col-12">
                        <div className="fz-3-footer-widget">
                            <h5 className="fz-3-footer-widget__title">News Letter</h5>
                            <div className="fz-3-footer-subscribe">
                                <p className="fz-3-footer-subscribe-txt">Sign up to get the latest on sales, new releases, store events and more.</p>

                                <div className="fz-3-footer-subscribe-form">
                                    <div className="fz-3-footer-subscribe-form-input">
                                        <input type="email" name="footer-subs-email" id="fz-3-footer-subs-email" placeholder="Email"/>
                                        <span className="fz-3-footer-subs-icon"><i className="fa-light fa-envelope-open"></i></span>
                                    </div>
                                    <button className="fz-3-footer-subs-btn">subscribe <i className="fa-light fa-paper-plane"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="fz-3-footer-bottom">
            <div className="container">
                <div className="row gy-4 align-items-center">
                    <div className="col-lg-4">
                        <p className="fz-3-copyright">&copy;
                            {currentYear} Design & Developed by <b>CodeBasket</b>
                        </p>
                    </div>

                    <div className="col-lg-4 text-lg-end text-center">
                        <img src="assets/images/card.png" alt="Pyament Methods" className="fz-3-payment-methods"/>
                    </div>

                    <div className="col-lg-4">
                        <div className="fz-3-footer-socials">
                            <ul>
                                <li><Link href="#"><i className="fa-brands fa-facebook-f"></i></Link></li>
                                <li><Link href="#"><i className="fa-brands fa-twitter"></i></Link></li>
                                <li><Link href="#"><i className="fa-brands fa-instagram"></i></Link></li>
                                <li><Link href="#"><i className="fa-brands fa-youtube"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}

export default FooterSection3