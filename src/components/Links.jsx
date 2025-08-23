import React from "react";
import Header from "./Header";
import "./Links.css";
import { FaLaptopCode, FaGlobe, FaServicestack, FaWhatsapp, FaLightbulb, FaBusinessTime } from "react-icons/fa";

const links = [
  {
    label: "Visit Our website.",
    icon: <FaGlobe />,
    url: "/"
  },
  {
    label: "Join Software development class (web & app developem)",
    icon: <FaLaptopCode />, 
    url: "/courses"
  },
  {
    label: "View our services.",
    icon: <FaServicestack />,
    url: "/services"
  },
  {
    label: "Chat on Whatsapp",
    icon: <FaWhatsapp />,
    url: "https://api.whatsapp.com/send?phone=2348156853636&text=Hi,%20I%20need%20to%20know%20more%20information%20about%20your%20services."
  },
  {
    label: "I need a website.",
    icon: <FaLightbulb />,
    url: "/contact"
  },
  {
    label: "I need software for my business.",
    icon: <FaBusinessTime />,
    url: "/contact"
  }
];

const Links = () => {
  return (
    <>
      <Header />
      <div className="links-container">
        <h2 className="links-title">Quick Actions</h2>
        <div className="links-list">
          {links.map((link, idx) => (
            link.url.startsWith("http") ? (
              <a
                key={idx}
                href={link.url}
                className="links-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="links-icon">{link.icon}</span>
                {link.label}
              </a>
            ) : (
              <a
                key={idx}
                href={link.url}
                className="links-btn"
              >
                <span className="links-icon">{link.icon}</span>
                {link.label}
              </a>
            )
          ))}
        </div>
      </div>
    </>
  );
};

export default Links;
