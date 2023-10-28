import { ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";

import "../styles/booking-indepth-details.css";
import { BASE_URL } from "../config";

const BookingInDepthDetails = ({ bookingDetailsData, id }) => {
  const navigate = useNavigate();

  const {
    title,
    address,
    guestsSize,
    pricePerPerson,
    phone,
    bookAt,
    totalCost,
    fullName,
    userEmail,
  } = bookingDetailsData;

  const serviceFee = 10;
  const date = new Date(bookAt);
  const formatedDate = date.toLocaleDateString();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are You Sure You Want To Delete The Booking?"
    );

    if (confirmDelete) {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };

        const response = await fetch(`${BASE_URL}/bookings/${id}`, options);

        await response.json();

        if (!response.ok) {
          console.log(
            "Failed To Delete in FrontEnd in BookinginDepthDetails : ",
            response
          );
        } else {
          //console.log("Correct Response : ", result);
          navigate("/mybookings", { replace: true });
        }
      } catch (error) {
        console.log("Error in BookinginDepthDetails : ", error);
      }
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>{title}</h3>
      </div>

      <div className="booking__form">
        <h2>Information</h2>
        <p>Address : {address}</p>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Name</h5>
            <span>{fullName}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Email</h5>
            <span>{userEmail}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>phone</h5>
            <span>{phone}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Booked At</h5>
            <span>{formatedDate}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5 className="d-flex align-items-center gap-1">
              $ {pricePerPerson}
              <i class="ri-close-line"></i>/ 1 person
            </h5>
            <span>$ {pricePerPerson}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service Charges</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              No.of persons Booked
            </h5>
            <span>
              <i class="ri-group-line"></i> {guestsSize}
            </span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span>$ {totalCost}</span>
          </ListGroupItem>
        </ListGroup>
        <Button
          onClick={handleDelete}
          type="button"
          className="btn primary__btn w-100 mt-4"
        >
          Delete Booking
        </Button>
      </div>
    </div>
  );
};

export default BookingInDepthDetails;
