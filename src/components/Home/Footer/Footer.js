import React from 'react'
import logo from '../../../images/logo.png'
import sm1 from '../../../images/blog/small/1.jpg'
import sm2 from '../../../images/blog/small/2.jpg'
import sm3 from '../../../images/blog/small/3.jpg'

function Footer() {
    return (
        <footer id="rs-footer" className="rs-footer style4" aria-label="Footer - AbubakarDev Web & App Development Kano">
            <div style={{width: '90%', margin: 'auto'}}>
                <div className="footer-newsletter">
                    <div className="row y-middle">
                        <div className="col-md-6 sm-mb-26">
                            <h3 className="title white-color mb-0">Newsletter Subscribe</h3>
                        </div>
                        <div className="col-md-6 text-right">
                            <form className="newsletter-form">
                                <input type="email" name="email" placeholder="Your email address" required=""/>
                                <button type="submit"><i className="fa fa-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="footer-content pt-62 pb-79 md-pb-64 sm-pt-48">
                    <div className="row">
                        <div className="col-lg-4 col-md-12 col-sm-12 footer-widget md-mb-39">
                            <div className="about-widget pr-15">
                                <div className="logo-part">
                                    <a href="index.html"><img src={logo} alt="AbubakarDev Logo - Web & App Development Kano" /></a>
                                </div>
                                <p className="desc">We denounce with righteous indignation in and dislike men who are so beguiled and to demo realized by the charms of pleasure moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound.</p>
                                <div className="btn-part">
                                    <a className="readon" href="about.html" aria-label="Discover More About Web & App Development in Kano">Discover More</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 md-mb-32 footer-widget">
                            <h4 className="widget-title">Contact Info</h4>
                            <ul className="address-widget pr-40">
                                <li>
                                    <i className="flaticon-location"></i>
                                    <div className="desc">374 William S Canning Blvd, Fall River MA 2721, USA</div>
                                </li>
                                <li>
                                    <i className="flaticon-email"></i>
                                    <div className="desc">
                                        <a href="mailto:info@abubakardev.dev">info@abubakardev.dev</a>
                                    </div>
                                </li>
                                <li>
                                    <i className="flaticon-clock"></i>
                                    <div className="desc">
                                  
                                    </div>
                                </li>
                                <li>
                                    <div className="desc" style={{display: 'flex', alignItems: 'center'}}>
                                        <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi%20AbubakarDev.%20I%20need%20information%20about%20your%20services." style={{color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                                            <i className="fa fa-whatsapp" style={{marginRight: '2px', fontSize: '18px'}}></i>
                                            Contact us on WhatsApp
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12 footer-widget">
                            <h4 className="widget-title">Latest Posts</h4>
                            <div className="footer-post">
                                <div className="post-wrap mb-15">
                                    <div className="post-img">
                                        <a href="blog-single.html"><img src={sm1} alt="Latest Web Development Post Kano" /></a>
                                    </div>
                                    <div className="post-desc">
                                        <a href="blog-single.html">Covid-19 threatens the next generation of smartphones</a>
                                        <div className="date-post">
                                            <i className="fa fa-calendar"></i>
                                            September 6, 2019
                                        </div>
                                    </div>
                                </div>
                                <div className="post-wrap mb-15">
                                    <div className="post-img">
                                        <a href="blog-single.html"><img src={sm2} alt="Latest Technology Post Kano" /></a>
                                    </div>
                                    <div className="post-desc">
                                        <a href="blog-single.html">Soundtrack filma Lady Exclusive Music</a>
                                        <div className="date-post">
                                            <i className="fa fa-calendar"></i>
                                            April 15, 2019
                                        </div>
                                    </div>
                                </div>
                                <div className="post-wrap">
                                    <div className="post-img">
                                        <a href="blog-single.html"><img src={sm3} alt="Latest Innovation Post Kano" /></a>
                                    </div>
                                    <div className="post-desc">
                                        <a href="blog-single.html">Winged moved stars, fruit creature seed night.</a>
                                        <div className="date-post">
                                            <i className="fa fa-calendar"></i>
                                            October 9, 2019
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <div className="row y-middle">
                        <div className="col-lg-6 col-md-8 sm-mb-21">
                            <div className="copyright">
                                <p>© Copyright 2025 AbubakarDev. All Rights Reserved.</p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-4 text-right sm-text-center">
                            <ul className="footer-social">
                                <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                                <li><a href="#"><i className="fa fa-twitter"></i></a></li>
                                <li><a href="#"><i className="fa fa-pinterest-p"></i></a></li>
                                <li><a href="#"><i className="fa fa-linkedin"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
      