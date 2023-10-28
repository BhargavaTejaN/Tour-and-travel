import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";

import "../styles/booking-details.css";
import { BASE_URL } from "../config";
import calculateAvgRating from "../shared/averageRating";
import BookingInDepthDetails from "../shared/BookingInDepthDetails";
import Newsletter from "../shared/Newsletter";

const BookingDetails = () => {
  const { id } = useParams();

  const [bookingDetailsData, setBookingDetailsData] = useState({
    title: "",
    photo: "",
    address: "",
    distance: "",
    desc: "",
    pricePerPerson: 0,
    maxGroupSize: 0,
    reviews: [],
    city: "",
    guestsSize: 0,
    phone: 0,
    bookAt: "",
    totalCost: 0,
    fullName: "",
    userEmail: "",
  });

  useEffect(() => {
    const getBookingDetails = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };

        const response = await fetch(`${BASE_URL}/bookings/${id}`, options);

        const result = await response.json();

        if (!response.ok) {
          console.log("Error In Booking Details page : ", response);
        } else {
          //console.log("correct Response : ", result);
          const { bookingDetails, tour } = result.data;
          setBookingDetailsData({
            title: tour.title,
            photo: tour.photo,
            address: tour.address,
            distance: tour.distance,
            desc: tour.desc,
            pricePerPerson: tour.price,
            maxGroupSize: tour.maxGroupSize,
            reviews: tour.reviews,
            city: tour.city,
            guestsSize: bookingDetails.guestsSize,
            phone: bookingDetails.phone,
            bookAt: bookingDetails.bookAt,
            totalCost: bookingDetails.totalCost,
            fullName: bookingDetails.fullName,
            userEmail: bookingDetails.userEmail,
          });
        }
      } catch (error) {
        console.log(
          "Error While Fetching The Details in BookingDetails Page : ",
          error
        );
      }
    };

    getBookingDetails();
  }, [id]);

  const { avgRating, totalRating } = calculateAvgRating(
    bookingDetailsData?.reviews
  );

  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={bookingDetailsData?.photo} alt="tour-img" />

                <div className="tour__info">
                  <h2>{bookingDetailsData?.title}</h2>

                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i
                        style={{
                          color: "var(--secondary-color)",
                        }}
                        class="ri-star-fill"
                      ></i>
                      {avgRating === 0 ? null : avgRating}
                      {totalRating === 0 ? (
                        "Not rated"
                      ) : (
                        <span>({bookingDetailsData?.reviews.length})</span>
                      )}
                    </span>

                    <span>
                      <i class="ri-map-pin-user-fill"></i>
                      {bookingDetailsData?.address}
                    </span>
                  </div>

                  <div className="tour__extra-details">
                    <span>
                      <i class="ri-map-pin-2-line"></i>
                      {bookingDetailsData?.city}
                    </span>

                    <span>
                      <i class="ri-money-doller-circle-line"></i>$
                      {bookingDetailsData?.pricePerPerson}/per person
                    </span>

                    <span>
                      <i class="ri-map-pin-time-line"></i>
                      {bookingDetailsData?.distance} /km
                    </span>

                    <span>
                      <i class="ri-group-line"></i> Max{" "}
                      {bookingDetailsData?.maxGroupSize} people
                    </span>
                  </div>

                  <h5>Description</h5>
                  <p>{bookingDetailsData?.desc}</p>
                </div>
              </div>
            </Col>

            <Col lg="4">
                <BookingInDepthDetails bookingDetailsData={bookingDetailsData} id={id} />
            </Col>

          </Row>
        </Container>
      </section>
      <Newsletter />
    </div>
  );
};

export default BookingDetails;
