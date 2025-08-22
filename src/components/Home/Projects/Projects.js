import React from 'react';
import banner1 from '../../../images/projects/1.jpg'
import banner2 from '../../../images/projects/2.jpg'
import banner3 from '../../../images/projects/3.jpg'
import banner4 from '../../../images/projects/4.jpg'
import banner5 from '../../../images/projects/5.jpg'
import banner6 from '../../../images/projects/6.jpg'
import './Projects.css';

function Projects() {
    return (
        <section id="rs-portfolio" className="bg42 pb-5 mb-3" aria-label="Recent Portfolios - Web & App Projects Kano">
            <div className="" style={{ width: '90%', margin: 'auto' }}>
                <div className="sec-title4 text-center p-5">
                    <span className="sub-title white-color pb-15">Projects</span>
                    <h2 className="title white-color">Recent Portfolios</h2>
                </div>
                <div className="slider-part">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-12 portfolio-wrap">
                            <div className="img-part">
                                <img src={banner1} className="images" alt="Web Design Project Kano" />
                                <div className="content-part">
                                    <div className="text">
                                        <i className="fa fa-link" style={{ fontSize: '30px' }}></i>
                                        <h4 className="text-white">VIEW WEBSITE</h4>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 portfolio-wrap">
                            <div className="img-part">
                                <img src={banner2} className="images" alt="Mobile App Development Project Kano" />
                                <div className="content-part">
                                    <div className="text">
                                        <i className="fa fa-link" style={{ fontSize: '30px' }}></i>
                                        <h4 className="text-white">VIEW WEBSITE</h4>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 portfolio-wrap">
                            <div className="img-part">
                                <img src={banner3} className="images" alt="E-commerce Website Development Kano" />
                                <div className="content-part">
                                    <div className="text">
                                        <i className="fa fa-link" style={{ fontSize: '30px' }}></i>
                                        <h4 className="text-white">VIEW WEBSITE</h4>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 portfolio-wrap">
                            <div className="img-part">
                                <img src={banner4} className="images" alt="Portfolio Website Design Kano" />
                                <div className="content-part">
                                    <div className="text">
                                        <i className="fa fa-link" style={{ fontSize: '30px' }}></i>
                                        <h4 className="text-white">VIEW WEBSITE</h4>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 portfolio-wrap">
                            <div className="img-part">
                                <img src={banner5} className="images" alt="Blog Website Development Kano" />
                                <div className="content-part">
                                    <div className="text">
                                        <i className="fa fa-link" style={{ fontSize: '30px' }}></i>
                                        <h4 className="text-white">VIEW WEBSITE</h4>
                                    </div>

                                </div>

                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 portfolio-wrap">
                            <div className="img-part">
                                <img src={banner6} className="images" alt="Landing Page Design Kano" />
                                <div className="content-part">
                                    <div className="text">
                                        <i className="fa fa-link" style={{ fontSize: '30px' }}></i>
                                        <h4 className="text-white">VIEW WEBSITE</h4>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                <div className="btn-part">
                    <div className="form-group">
                        <button className="readon2 submit-btn con-btn" aria-label="View More Web & App Projects">View More</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Projects
         