import React from 'react';
import blog1 from '../../../images/blog/style7/6.jpg'
import blog2 from '../../../images/blog/style7/2.jpg'
import blog3 from '../../../images/blog/style7/3.jpg'

function Blogs() {
    return (
        <section id="rs-blog" className="rs-blog style4 pt-100 pb-100 md-pt-70 md-pb-70" aria-label="Latest News - Web & App Development Kano">
            <div style={{width: '90%', margin: 'auto'}}>
                <div className="y-middle d-flex">
                    <div className="col-md-6 sm-mb-20">
                        <div className="sec-title">
                            <span className="sub-title primary right-line">Latest News</span>
                            <h2 className="title mb-0">Read Latest Updates</h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="btn-part text-right sm-text-left">
                            <a className="readon2 submit-btn con-btn" href="blog-single.html">View Updates</a>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 mb-5 d-flex">
                    <div className="col-md-4 blog-item">
                        <div className="blog-wrap">
                            <div className="img-part">
                                <a href="#"><img src={blog1} alt="Web Development News Kano" /></a>
                            </div>
                            <div className="blog-content">
                                <a className="categories" href="blog-single.html">Digital Marketing</a>
                                <h3 className="title"><a href="blog-single.html">Whale be raised, it must be in a month</a></h3>
                                <div className="blog-meta">
                                    <div className="date">
                                        <i className="fa fa-clock-o"></i> 18 Jan 2021
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 blog-item">
                        <div className="blog-wrap">
                            <div className="img-part">
                                <a href="#"><img src={blog2} alt="Photography Tips Blog Kano" /></a>
                            </div>
                            <div className="blog-content">
                                <a className="categories" href="blog-single.html">Digital Marketing</a>
                                <h3 className="title"><a href="blog-single.html">Career Tips For Emerging Photographers</a></h3>
                                <div className="blog-meta">
                                    <div className="date">
                                        <i className="fa fa-clock-o"></i> 18 jan 2021
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 blog-item">
                        <div className="blog-wrap">
                            <div className="img-part">
                                <a href="#"><img src={blog3} alt="Exclusive Music Soundtrack Blog Kano" /></a>
                            </div>
                            <div className="blog-content">
                                <a className="categories" href="blog-single.html">Digital Marketing</a>
                                <h3 className="title"><a href="blog-single.html">Soundtrack filma Lady Exclusive Music</a></h3>
                                <div className="blog-meta">
                                    <div className="date">
                                        <i className="fa fa-clock-o"></i> 20 jan 2021
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Blogs
