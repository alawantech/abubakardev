import React from 'react';
import './Toolsbar.css'

function Toolsbar() {
    return (
        <div class="toolbar-area" style={{ borderBottom: '1px solid grey', color:'white' }}>
            <div class="row inner-tools-area" >
                <div className="col-md-2 toolsbar">
                    <ul className="text-left" style={{textAlign:'center'}}>
                        <li><a href="mailto:info@abubakardev.dev">info@abubakardev.dev</a></li>
                    </ul>
                </div>
                <div className="col-md-8 toolsbar" style={{borderLeft:'1px solid grey', borderRight:'1px solid grey'}}>
                    <ul className="d-flex justify-content-between">
                        <li>
                            <a href="https://api.whatsapp.com/send?phone=2348156853636&text=Hi%20AbubakarDev.%20I%20need%20information%20about%20your%20services." style={{color: 'white', textDecoration: 'none'}}>
                                <i class="fa fa-whatsapp" style={{marginRight: '5px'}}></i>
                                Contact us on WhatsApp
                            </a>
                        </li>
                        <li class="opening">
                            <span style={{color: 'white'}}>We respond quickly to all WhatsApp messages!</span>
                        </li>
                    </ul>
                </div>
                <div className="col-md-2 toolsbar">
                    <ul className="d-flex justify-content-around">
                        <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                        <li><a href="#"><i class="fa fa-pinterest-p"></i></a></li>
                        <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Toolsbar
