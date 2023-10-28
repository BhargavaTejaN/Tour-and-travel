import { Link } from "react-router-dom";
import { Card, CardBody } from "reactstrap";

const BookingCard = ({ tour }) => {
  const { _id, tourDetails, guestsSize, totalCost } = tour;
  const { title, photo, city } = tourDetails;

  return (
    <div className="tour__card">
      <Link to={`/bookingDetails/${_id}`}>
        <Card>
          <div className="tour__img">
            <img src={photo} alt="tour-img" />
          </div>

          <CardBody>
            <div className="card__top d-flex align-items-center justify-content-between">
              <span className="tour__location d-flex align-items-center gap-1">
                <i class="ri-map-pin-line"></i>
                {city}
              </span>

              <span className="tour__rating d-flex align-items-center gap-1">
                <i class="ri-group-line"></i>
                {guestsSize}
              </span>
            </div>

            <h5 className="tour__title">
              <Link to={`/bookingDetails/${_id}`}>{title}</Link>
            </h5>

            <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
              <h5>
                ${totalCost}
                <span>/for {guestsSize} persons</span>
              </h5>

              <button className="btn booking__btn">
                <Link to={`/bookingDetails/${_id}`}>View Details</Link>
              </button>
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default BookingCard;
