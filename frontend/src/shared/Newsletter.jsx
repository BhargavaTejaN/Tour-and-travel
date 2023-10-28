import { Container, Row, Col } from "reactstrap";

import "../styles/newsletter.css";
import maleTourist from "../assets/images/male-tourist.png";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2>Subscribe Now To get Usefull Traveling Information</h2>

              <div className="newsletter__input">
                <input type="email" placeholder="Enter Your Email" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>

              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore
                voluptates quo nisi iusto
              </p>
            </div>
          </Col>

          <Col lg="6">
            <div className="newsletter__img">
              <img src={maleTourist} alt="maleTouristImage" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
