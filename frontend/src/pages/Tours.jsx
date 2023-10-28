import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

import "../styles/tours.css";
// import tourData from "../assets/data/tours";
import TourCard from "../shared/TourCard";
import SearchBar from "../shared/SearchBar";
import Newsletter from "../shared/Newsletter";
import CommonSection from "../shared/CommonSection";

import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../config";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const [toursList, setToursList] = useState([]);
  const [toursCountData, setToursCountData] = useState(1);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);

  useEffect(() => {
    if (tours && !loading && !error) {
      const pages = Math.ceil(toursCountData / 4);
      setPageCount(pages);
      window.scrollTo(0,0);
    }
  }, [page, toursCountData, loading, tours, error]);

  useEffect(() => {
    setToursList(tours.data);
    setToursCountData(tours.count);
  }, [tours]);

  return (
    <>
      <CommonSection title={"All Tours"} />

      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>

      <section className="pt-0">
        <Container>
          <Row>
            {loading && <h1 className="text-center pt-5">Loading</h1>}
            {error && <h1 className="text-center pt-5">{error}</h1>}

            {!loading &&
              !error &&
              toursList?.map((tour) => (
                <Col md='6' sm='6' lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}

            {pageCount > 0 && (
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      onClick={() => setPage(number)}
                      key={number}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            )}
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default Tours;
