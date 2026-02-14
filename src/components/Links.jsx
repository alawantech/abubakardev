import { useNavigate } from "react-router-dom";
import { FaGlobe, FaServicestack, FaWhatsapp, FaLightbulb, FaBusinessTime, FaChevronRight } from "react-icons/fa";
import "./Links.css";

const links = [
  {
    label: "Visit Our Website",
    icon: <FaGlobe />,
    url: "/",
    description: "Explore our main digital home"
  },
  {
    label: "Our Services",
    icon: <FaServicestack />,
    url: "/services",
    description: "What we can build for you"
  },
  {
    label: "Chat on WhatsApp",
    icon: <FaWhatsapp />,
    url: "https://wa.me/2348156853636",
    description: "Get instant support & consultation"
  },
  {
    label: "Request a Website",
    icon: <FaLightbulb />,
    url: "/contact",
    description: "Let's bring your idea to life"
  },
  {
    label: "Business Software",
    icon: <FaBusinessTime />,
    url: "/contact",
    description: "Custom solutions for your growth"
  }
];

const Links = () => {
  const navigate = useNavigate();

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
          <div className="profile-image-container">
            <img src="/logo2.png" alt="ZedroTech" className="profile-logo" />
          </div>
          <h1 className="profile-name">ZedroTech</h1>
          <p className="profile-bio">Innovating the Digital Future through Premium Software Solutions</p>
        </header>

        <div className="links-list">
          {links.map((link, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigation(link.url)}
              className="links-btn"
            >
              <span className="links-icon-wrapper">{link.icon}</span>
              <div className="links-text">
                <span className="links-label">{link.label}</span>
                <span className="links-description">{link.description}</span>
              </div>
              <FaChevronRight className="chevron-icon" />
            </button>
          ))}
        </div>

        <footer className="links-footer">
          <p>&copy; {new Date().getFullYear()} ZedroTech. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default Links;
