import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useLocation } from "react-router-dom";

import CommonSection from "../shared/CommonSection";
import TourCard from "../shared/TourCard";
import Newsletter from "../shared/Newsletter";

const SearchResultList = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  //console.log("data : ", data);

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {(data === null || data === undefined) && (
              <h4 className="text-center">No Tours Found</h4>
            )}
            {data?.map((tour) => (
              <Col key={tour._id} className="mb-4" lg="3">
                <TourCard tour={tour} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResultList;
