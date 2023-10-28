import { useRef } from "react";
import { Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";

import "../styles/search-bar.css";
import { BASE_URL } from "../config";

const SearchBar = () => {
  const navigate = useNavigate();

  const locationRef = useRef("");
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === "" || distance === "" || maxGroupSize === "") {
      return alert("All Fields Are Required");
    }

    const response = await fetch(`${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`)
    const data = await response.json();

    // console.log("data : ",data.data);

    navigate(
        `/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`,
        {state : data.data}
    );
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-map-pin-line"></i>
            </span>

            <div>
              <h6>Location</h6>
              <input
                ref={locationRef}
                type="text"
                placeholder="where are you going?"
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i class="ri-map-pin-time-line"></i>
            </span>

            <div>
              <h6>Distance</h6>
              <input
                ref={distanceRef}
                type="number"
                placeholder="Diatance km"
              />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-last">
            <span>
              <i class="ri-group-line"></i>
            </span>

            <div>
              <h6>Max People</h6>
              <input ref={maxGroupSizeRef} type="number" placeholder="0" />
            </div>
          </FormGroup>
          <span onClick={searchHandler} type="submit" className="search__icon">
            <i class="ri-search-line"></i>
          </span>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;
