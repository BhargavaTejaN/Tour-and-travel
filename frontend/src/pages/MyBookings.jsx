import { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";

import "../styles/my-bookings.css";
import CommonSection from "../shared/CommonSection";
import Newsletter from "../shared/Newsletter";
import { useAuthContext } from "../hooks/useContextHook";
import { BASE_URL } from "../config";
import BookingCard from "../shared/BookingCard";

const MyBookings = () => {
  const { user } = useAuthContext();
  const [bookingsList, setBookingsList] = useState([]);

  useEffect(() => {
    const getAllBookings = async () => {
      try {
        const options = {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        };

        const userId = user._id;
        const response = await fetch(
          `${BASE_URL}/bookings/user/${userId}`,
          options
        );

        const result = await response.json();

        if (!response.ok) {
          console.log("Failed To Get All Bokings : ", response);
        }

        if (response.ok) {
          //console.log("result : ",result);
          setBookingsList(result.data);
        }
      } catch (error) {
        console.log("Error While Fetching Booking Details : ", error);
      }
    };

    getAllBookings();
  }, [user]);

  //console.log("bookingsList : ",bookingsList);

  return (
    <>
      <CommonSection title={"My Bookings"} />

      <section>
        <Container>
          <Row>
            {bookingsList && bookingsList.length > 0 ? (
              <Row>
                {bookingsList?.map((tour) => (
                  <Col md="6" sm="6" lg="3" className="mb-4" key={tour._id}>
                    <BookingCard tour={tour} />
                  </Col>
                ))}
              </Row>
            ) : (
              <Row>
                <Col>
                  <p>No bookings found.</p>
                </Col>
              </Row>
            )}
          </Row>
        </Container>
      </section>

      <Newsletter />
    </>
  );
};

export default MyBookings;
