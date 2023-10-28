import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

import "./footer.css";
import logo from "../../assets/images/logo.png";

const quickLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quickLinks2 = [
  {
    path: "/mybookings",
    display: "My Bookings",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {

  const year = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <Container>
        <Row>

          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="logo" />
              <p>
                Lorem ipsum dolor sit amet conssectetur adipisicing elit commodi
                enim
              </p>

              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="https://www.youtube.com/c/Freecodecamp">
                    <i class="ri-youtube-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to="https://github.com/BhargavaTejaN?tab=repositories">
                    <i class="ri-github-fill"></i>
                  </Link>
                </span>

                <span>
                  <Link to="https://www.facebook.com/bhargava.sunny">
                    <i class="ri-facebook-circle-line"></i>
                  </Link>
                </span>

                <span>
                  <Link to="https://instagram.com/bhargava_teja__?igshid=YmMyMTA2M2Y=">
                    <i class="ri-instagram-line"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__quick-links">
              {quickLinks.map((item, index) => (
                <ListGroupItem className="ps-0 border-0" key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__quick-links">
              {quickLinks2.map((item, index) => (
                <ListGroupItem className="ps-0 border-0" key={index}>
                  <Link to={item.path}>{item.display}</Link>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>

          <Col lg="3">
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__quick-links">

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-map-pin-line"></i>{" "}
                    Address :
                  </span>
                </h6>

                <p className="mb-0">Bharat</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-mail-line"></i>
                    Email
                  </span>
                </h6>

                <p className="mb-0">nbhargavteja2022@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className="ps-0 border-0 d-flex align-items-center gap-3">
                <h6 className="mb-0 d-flex align-items-center gap-2">
                  <span>
                    <i class="ri-phone-line"></i>{" "}
                    Phone :
                  </span>
                </h6>

                <p className="mb-0">9036400498</p>
              </ListGroupItem>

            </ListGroup>
          </Col>

          <Col lg="12" className="text-center pt-5">
            <p className="coppyright">
              @ CopyRight {year}, design and developed By Bhargav Teja
            </p>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
