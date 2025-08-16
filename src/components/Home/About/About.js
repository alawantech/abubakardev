import React from 'react';
import { Helmet } from 'react-helmet';
import './About.css';
import about1 from '../../../images/about/solutions/1.jpg'
import about2 from '../../../images/about/solutions/2.png'
import about3 from '../../../images/about/solutions/3.png'

function About() {
    return (
        <section id="rs-about" className="rs-about style10 gray-bg5 p-5" aria-label="About AbubakarDev - Web & App Development Kano">
            <Helmet>
                <title>About Us | Web, App & Software Development Kano Nigeria</title>
                <meta name="description" content="Learn about AbubakarDev, a leading web design, app development, and software company in Kano, Nigeria. Unique IT & technology ideas." />
                <meta name="keywords" content="about web development Kano, app development Nigeria, software company Kano" />
            </Helmet>
            <div className="" style={{width: '90%', margin: 'auto'}}>
                <div className="row">
                    <div className="col-lg-6 pr-70 md-pr-15 md-mb-50">
                        <div className="sec-title4 mb-30">
                            <span className="sub-title new pb-10">About Us</span>
                            <h2 className="title pb-20">We are crafting unique IT & Technology Ideas in Kano, Nigeria</h2>
                            <p className="margin-0">We denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms</p>
                        </div>
                        <div id="accordion" className="accordion">
                            <div className="card">
                                <div className="card-header">
                                    <a className="card-link" data-toggle="collapse" href="#collapseOne">Responsive & Pixel Perfect Design</a>
                                </div>
                                <div id="collapseOne" className="collapse show" data-parent="#accordion">
                                    <div className="card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo data communication.</div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <a className="collapsed card-link" data-toggle="collapse" href="#collapseTwo">Elementor Page Builder Used</a>
                                </div>
                                <div id="collapseTwo" className="collapse" data-parent="#accordion">
                                    <div className="card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo data center and analytics.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="about-content">
                            <div className="images-part">
                                <img src={about1} alt="About AbubakarDev - Web & App Development Kano" />
                            </div>
                            <div className="rs-animations">
                                <div className="spinner dot">
                                    <img className="scale" src={about2} alt="Web Development Solutions Kano" />
                                </div>
                                <div className="spinner ball">
                                    <img className="dance2" src={about3} alt="App Development Solutions Nigeria" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About

