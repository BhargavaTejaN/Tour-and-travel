import { Col } from "reactstrap";

import TourCard from "../../shared/TourCard";
//import tourData from "../../assets/data/tours";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../config";

const FeaturedToursList = () => {
  const {
    data: featuredTours,
    loading,
    error,
  } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);
  // console.log("FeaturedTours : ",featuredTours.data);

  return (
    <>
      {loading && <h1>Loading...</h1>}
      {error && <h1>{error}</h1>}
      {!loading && !error && featuredTours.data?.map((tour) => (
        <Col md='6' sm='6' key={tour._id} lg="3" className="mb-4">
          <TourCard tour={tour} />
        </Col>
      ))}
    </>
  );
};

export default FeaturedToursList;
