import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaAddressCard,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import "../styles/about.css";
import socialLinks from "../socialLinks";
import CommonSection from "../shared/CommonSection";
import Newsletter from "../shared/Newsletter";

const About = () => {
  const {
    github,
    linkedin,
    instagram,
    whatsapp,
    facebook,
    twitter,
    portfolio,
  } = socialLinks;

  return (
    <>
      <CommonSection title={"About"} />

      <div className="about-container">
        <p className="about-text">
          Welcome to our Tour & Travels App! We aim to provide the best tour
          experiences with our handpicked destinations and exceptional service.
          Our team is dedicated to ensuring you have a memorable and enjoyable
          journey. Feel free to explore our exciting tour packages and embark on
          an adventure of a lifetime with us.
        </p>
        <div className="social-links">
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaGithub />
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href={portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaAddressCard />
          </a>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaInstagram />
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaWhatsapp />
          </a>
          <a
            href={facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaFacebook />
          </a>
          <a
            href={twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaXTwitter />
          </a>
        </div>
      </div>
        <Newsletter />
    </>
  );
};

export default About;
