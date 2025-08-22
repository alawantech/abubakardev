import React from "react";
import Header from "./Header";
import "./Links.css";
import { FaLaptopCode, FaGlobe, FaServicestack, FaWhatsapp, FaLightbulb, FaBusinessTime } from "react-icons/fa";

const links = [
  {
    label: "Join Software development class (web & app developem)",
    icon: <FaLaptopCode />, 
    url: "#join-class"
  },
  {
    label: "Visit Our website.",
    icon: <FaGlobe />,
    url: "#visit-website"
  },
  {
    label: "View our services.",
    icon: <FaServicestack />,
    url: "#services"
  },
  {
    label: "Chat on Whatsapp",
    icon: <FaWhatsapp />,
    url: "https://wa.me/234000000000"
  },
  {
    label: "I need a website.",
    icon: <FaLightbulb />,
    url: "#need-website"
  },
  {
    label: "I need software for my business.",
    icon: <FaBusinessTime />,
    url: "#need-software"
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
            <a
              key={idx}
              href={link.url}
              className="links-btn"
              target={link.url.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              <span className="links-icon">{link.icon}</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Links;
