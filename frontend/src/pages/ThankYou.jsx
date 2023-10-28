import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

import "../styles/thankyou.css";
import Newsletter from "../shared/Newsletter";

const ThankYou = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col className="pt-5 text-center" lg="12">
              <div className="thank__you">
                <span>
                  <i class="ri-checkbox-circle-line"></i>
                </span>
                <h1 className="mb-3 fw-semibold">Thank You</h1>
                <h3 className="mb-4">Your Tour Is Booked.</h3>

                <Button className="btn primary__btn w-25">
                  <Link to="/home">Back to Home</Link>
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default ThankYou;
