import React from 'react'

function Contact() {
    return (
        <div id="rs-contact" class="rs-contact style5 modify1 gray-bg5">
                <div class="" style={{width: '90%', margin: 'auto'}}>
                    <div class="contact-us" style={{paddingTop:'80px', paddingBottom:'80px'}}>
                        <div class="row margin-0">
                            <div class="col-lg-8" style={{marginRight:'-30px'}}>
                                <div class="contact-widget">
                                    <div class="sec-title5 pt-5 pb-5">
                                        <span class="sub-title new-title">Contact Us</span>
                                        <h2 class="title title2">Get In Touch</h2>
                                    </div>
                                    <div id="form-messages"></div>
                                    <form id="contact-form" method="post" action="mailer.php">
                                        <fieldset>
                                            <div class="row">
                                                <div class="col-lg-6 mb-3 col-md-6 col-sm-6">
                                                    <input class="from-control" type="text" id="name" name="name" placeholder="Name" required=""/>
                                                </div> 
                                                <div class="col-lg-6 mb-3 col-md-6 col-sm-6">
                                                    <input class="from-control" type="text" id="email" name="email" placeholder="E-Mail" required=""/>
                                                </div>   
                                                <div class="col-lg-6 mb-3 col-md-6 col-sm-6">
                                                    <input class="from-control" type="text" id="phone" name="phone" placeholder="Phone Number" required=""/>
                                                </div>   
                                                <div class="col-lg-6 mb-3 col-md-6 col-sm-6">
                                                    <input class="from-control" type="text" id="Website" name="subject" placeholder="Your Website" required=""/>
                                                </div>
                                          
                                                <div class="col-lg-12 mb-3">
                                                    <textarea class="from-control" id="message" name="message" placeholder="Your message Here" required=""></textarea>
                                                </div>
                                            </div>
                                            <div class="btn-part">                                            
                                                <div class="form-group">
                                                    <input class="readon2 submit-btn con-btn" type="submit" value="Submit Now"/>
                                                </div>
                                            </div>  
                                        </fieldset>
                                    </form> 
                                </div>
                            </div>
                            <div class="col-lg-4 padding-0">
                               <div class="contact-box">
                                    <div class="sec-title2 mb-4">
                                       <h2 class="title small white-color">Contact Info</h2>
                                    </div>
                                    <div class="address-box mb-4 " >
                                        <div class="box-icon">
                                            <i class="fa fa-map-marker"></i>
                                        </div>
                                        <div class="address-text">
                                            <span class="label">USA Office</span>
                                            <p class="desc">
                                                127 Double Street, Dublin,<br/>
                                                United Kingdom.
                                            </p>
                                        </div>
                                    </div>
                                    <div class="address-box mb-4 " >
                                        <div class="box-icon">
                                            <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi%20AbubakarDev.%20I%20need%20information%20about%20your%20services." style={{color: 'white'}}>
                                                <i class="fa fa-whatsapp"></i>
                                            </a>
                                        </div>
                                        <div class="address-text">
                                            <span class="label">
                                                <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi%20AbubakarDev.%20I%20need%20information%20about%20your%20services." style={{color: 'white', textDecoration: 'none'}}>
                                                    WhatsApp
                                                </a>
                                            </span>
                                            <p class="desc">
                                                <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi%20AbubakarDev.%20I%20need%20information%20about%20your%20services." style={{color: 'white', textDecoration: 'none'}}>
                                                    Contact us on WhatsApp
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="address-box mb-4 " >
                                        <div class="box-icon">
                                            <i class="fa fa-envelope"></i>
                                        </div>
                                        <div class="address-text">
                                            <span class="label">Mail Us</span>
                                            <p class="desc">
                                                <a href="#"> contact@abubakardev.dev</a><br/>
                                                <a href="#"> info@abubakardev.dev</a>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="address-box mb-4" >
                                        <div class="box-icon">
                                            <i class="fa fa-clock-o"></i>
                                        </div>
                                        <div class="address-text">
                                            <span class="label">USA Office</span>
                                            <p class="desc">
                                                127 Double Street, Dublin,<br/>
                                                United Kingdom.
                                            </p>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Contact
