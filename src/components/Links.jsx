import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaGlobe,
  FaServicestack,
  FaWhatsapp,
  FaLightbulb,
  FaBusinessTime,
  FaChevronRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaLink
} from "react-icons/fa";
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import "./Links.css";

const ICON_OPTIONS = {
  FaGlobe: <FaGlobe />,
  FaServicestack: <FaServicestack />,
  FaWhatsapp: <FaWhatsapp />,
  FaLightbulb: <FaLightbulb />,
  FaBusinessTime: <FaBusinessTime />,
  FaFacebook: <FaFacebook />,
  FaTwitter: <FaTwitter />,
  FaInstagram: <FaInstagram />,
  FaLinkedin: <FaLinkedin />,
  FaGithub: <FaGithub />,
  FaYoutube: <FaYoutube />,
  FaEnvelope: <FaEnvelope />,
  FaPhone: <FaPhone />,
  FaLink: <FaLink />
};

// Fallback/Initial links
const fallbackLinks = [
  {
    label: "Visit Our Website",
    iconName: "FaGlobe",
    url: "/",
    description: "Explore our main digital home"
  },
  {
    label: "Our Services",
    iconName: "FaServicestack",
    url: "/services",
    description: "What we can build for you"
  },
  {
    label: "Chat on WhatsApp",
    iconName: "FaWhatsapp",
    url: "https://wa.me/2348156853636",
    description: "Get instant support & consultation"
  }
];

const Links = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const q = query(collection(db, 'quick_links'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedLinks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        if (fetchedLinks.length > 0) {
          setLinks(fetchedLinks);
        } else {
          setLinks(fallbackLinks);
        }
      } catch (error) {
        console.error("Error fetching dynamic links:", error);
        setLinks(fallbackLinks);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const handleNavigation = (url) => {
    if (url.startsWith('http')) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigate(url);
    }
  };

  return (
    <div className="links-page">
      <div className="links-background">
        <div className="blob"></div>
        <div className="blob"></div>
      </div>

      <div className="links-container">
        <header className="links-profile">
          <img src="/logo2.png" alt="ZedroTech" className="profile-logo" />
          <p className="profile-bio">Innovating the Digital Future through Premium Software Solutions</p>
        </header>

        <div className="links-list">
          {loading ? (
            <div className="links-loading">
              <div className="links-spinner"></div>
              <span>Updating quick actions...</span>
            </div>
          ) : (
            links.map((link, idx) => (
              <button
                key={link.id || idx}
                onClick={() => handleNavigation(link.url)}
                className="links-btn"
              >
                <span className="links-icon-wrapper">
                  {ICON_OPTIONS[link.iconName] || <FaLink />}
                </span>
                <div className="links-text">
                  <span className="links-label">{link.label}</span>
                  <span className="links-description">{link.description}</span>
                </div>
                <FaChevronRight className="chevron-icon" />
              </button>
            ))
          )}
        </div>

        <footer className="links-footer">
          <p>&copy; {new Date().getFullYear()} ZedroTech. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Links;
