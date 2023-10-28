import { useEffect, useState } from "react";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import "./booking.css";
import { useAuthContext } from "../../hooks/useContextHook";
import { BASE_URL } from "../../config";

const Booking = ({ tour, avgRating,tourId }) => {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  //const { id } = useParams();
  //console.log("tourId : ",tourId);

  const { price, reviews } = tour;
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    fullName: "",
    phone: "",
    guestsSize: 1,
    bookAt: "",
    tourName: '',
    tourId : tourId && tourId,
    totalCost : 0
  });

  const handleChange = (e) => {
    try {
      e.preventDefault();
      if (e.target.id === "guestsSize") {
        const totalCost =
          Number(price) * Number(e.target.value) + Number(serviceFee);
        setBooking((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
          totalCost: totalCost,
        }));
      } else {
        setBooking((prevState) => ({
          ...prevState,
          [e.target.id]: e.target.value,
        }));
      }
    } catch (error) {
      console.log("Error : ", error);
    }
  };
  
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      if (!user || !user === "null" || user === undefined) {
        return alert("Please login");
      }

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(booking),
      };

      const response = await fetch(`${BASE_URL}/bookings`, options);

      await response.json();

      if (!response.ok) {
        console.log("Error While Booking : ", response);
      } else {
        navigate("/thank-you");
      }
    } catch (error) {
      console.log("Error While Submiting : ", error);
      throw new Error("Failed To Submit " + error);
    }
  };

  const serviceFee = 10;
  const totalAmount =
    Number(price) * Number(booking.guestsSize) + Number(serviceFee);

  useEffect(() => {
    if(tour && tour.title){
      setBooking((prevState) => ({
        ...prevState,
        tourName : tour.title
      }))
    }
  },[tour])

  // useEffect(() => {
  //   if (user && user !== "null" && user !== undefined) {
  //     setBooking((prevState) => ({
  //       ...prevState,
  //       userId: user._id,
  //       userEmail: user.email,
  //     }));
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (user && user !== "null" && user !== undefined) {
  //     const getTourDetails = async () => {
  //       try {
  //         const options = {
  //           method: "GET",
  //         };

  //         const response = await fetch(`${BASE_URL}/tours/${id}`, options);

  //         const result = await response.json();

  //         //console.log("result tour details : ",result);

  //         if (!response.ok) {
  //           console.log("Failed To Get The Tour Details : ", response);
  //         } else {
  //           setBooking((prevState) => ({
  //             ...prevState,
  //             tourName: result.data.title,
  //           }));
  //         }
  //       } catch (error) {
  //         console.log("Failed To Get The Tour Details : ", error);
  //       }
  //     };

  //     getTourDetails();
  //   }
  // }, [id, user]);

  //console.log("booking : ",booking);

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          ${price}
          <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking__form">
        <h5>Information</h5>
        <Form onSubmit={handleClick} className="booking__info-form">
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              value={booking.fullName}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              value={booking.phone}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              id="bookAt"
              required
              value={booking.bookAt}
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="No of Guests"
              id="guestsSize"
              required
              value={booking.guestsSize}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price}
              <i class="ri-close-line"></i>/ 1 person
            </h5>
            <span>${price}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service Charges</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>$ {totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button onClick={handleClick} className="btn primary__btn w-100 mt-4">
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;
