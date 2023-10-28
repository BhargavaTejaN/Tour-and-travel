import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, ListGroup, Form } from "reactstrap";
import { useParams } from "react-router-dom";

import "../styles/tourdetails.css";
import avatar from "../assets/images/avatar.jpg";
//import tourData from "../assets/data/tours";
import calculateAvgRating from "../shared/averageRating";
import Booking from "../components/Booking/Booking";
import Newsletter from "../shared/Newsletter";

import { BASE_URL } from "../config";
import useFetch from "../hooks/useFetch";
import { useAuthContext } from "../hooks/useContextHook";

const TourDetails = () => {
  const { id } = useParams();

  const { user } = useAuthContext();

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);

  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const [tourDetails, setTourDetails] = useState({
    photo: "",
    title: "",
    desc: "",
    price: 0,
    address: "",
    reviews: [],
    city: "",
    distance: 0,
    maxGroupSize: 0,
  });

  const [editedReview, setEditedReview] = useState('');
  const [editModeId, setEditModeId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  //const tour = tourData.find((tour) => tour.id === id);
  // const {
  //   photo,
  //   title,
  //   desc,
  //   price,
  //   address,
  //   reviews,
  //   city,
  //   distance,
  //   maxGroupSize,
  // } = tourDetails;
  const { avgRating, totalRating } = calculateAvgRating(tourDetails?.reviews);

  // console.log("photo : ",photo);
  // console.log("title : ",title);
  // console.log("desc : ",desc);
  // console.log("price : ",price);
  // console.log("address : ",address);
  // console.log("reviews : ",reviews);
  // console.log("city : ",city);
  // console.log("distance : ",distance);
  // console.log("maxGroupSize : ",maxGroupSize);

  // console.log("avgRating : ",avgRating);
  // console.log("totalRating : ",totalRating);

  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleTextareaChange = (e) => {
    setEditedReview(e.target.value);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const reviewText = reviewMsgRef.current.value;
    // alert(`${reviewText}, ${tourRating}`);

    try {
      if (!user || user === undefined || user === "null") {
        alert("Please signin");
      }

      const reviewObj = {
        productId: id,
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const options = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewObj),
      };

      const response = await fetch(`${BASE_URL}/review/${id}`, options);

      await response.json();
      //alert(result.message);

      if (!response.ok) {
        console.log("Error While Submiting the review : ", response);
        //return alert(result.message);
      } else {
        // fetch the updated data from the backend
        const updatedTourResponse = await fetch(`${BASE_URL}/tours/${id}`);
        const updatedTourData = await updatedTourResponse.json();

        if (!updatedTourResponse.ok) {
          console.log(
            "Error while fetching updated data: ",
            updatedTourResponse
          );
        } else {
          setTourDetails(updatedTourData.data);
          reviewMsgRef.current.value = "";
          setTourRating(null);
        }
      }

      //alert(result.message);
    } catch (error) {
      console.log("Error While Submiting the Review : ", error);
      alert("Failed to submit the Review : ", error);
    }
  };

  const deleteReview = async (id) => {
    try {
      //console.log("Review Id : ",id);

      const options = {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id }),
      };

      const response = await fetch(`${BASE_URL}/review`, options);

      if (!response.ok) {
        console.log("Failed To Delete Review : ", response);
        throw new Error("Could not delete the review");
      } else {
        // update the details in the frontend
        const updatedReviews = tourDetails.reviews.filter(
          (review) => review._id !== id
        );
        setTourDetails({ ...tourDetails, reviews: updatedReviews });
      }
    } catch (error) {
      console.log("Error While Deleting Review : ", error);
      alert("Failed To Delete Review");
    }
  };

  const handleSave = async(id) => {
    try {

      if(editedReview.trim() === ""){
        const confirmDelete = window.confirm("Review is empty. if you want to save the empty review it will get deleted. are you sure you want to click yes?");

        if(confirmDelete){
          await deleteReview(id);
          setEditModeId(null);
          return
        }
      }

      const options = {
        method : "PUT",
        headers : {
          'Content-type' : 'application/json'
        },
        body : JSON.stringify({
          id,
          editedReview: { reviewText: editedReview },
        })
      }

      const response = await fetch(
        `${BASE_URL}/review`,options
      );

      if(!response.ok){
        console.log("Error While Saving the Form : ",response)
      } else{
        // fetch the updated tourDetails with updated reviews
        const updatedTourDetails = { ...tourDetails };
        const updatedReviews = updatedTourDetails.reviews.map((item) => {
          if (item._id === id) {
            return { ...item, reviewText: editedReview };
          }
          return item;
        });
        updatedTourDetails.reviews = updatedReviews;
        setTourDetails(updatedTourDetails);
      }

      setEditModeId(null);

      //console.log("editedReviewId : ",editedReviewId);
      
    } catch (error) {
      console.log("Error While Saving The Review : ",error);
    }
  }

  useEffect(() => {
    if (!loading && !error && tour.data) {
      setTourDetails(tour.data);
    }
  }, [error, loading, tour]);

  if (loading) return <h1 className="text-center">Loading...</h1>;
  if (error) return <h1 className="tet-center">{error}</h1>;

  //console.log("tourDetails : ",tourDetails);

  return (
    <>
      {!loading && !error && (
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={tourDetails?.photo} alt="title" />

                  <div className="tour__info">
                    <h2>{tourDetails?.title}</h2>

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
                          <span>({tourDetails?.reviews.length})</span>
                        )}
                      </span>

                      <span>
                        <i class="ri-map-pin-user-fill"></i>
                        {tourDetails?.address}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i class="ri-map-pin-2-line"></i>
                        {tourDetails?.city}
                      </span>

                      <span>
                        <i class="ri-money-doller-circle-line"></i>$
                        {tourDetails?.price}/per person
                      </span>

                      <span>
                        <i class="ri-map-pin-time-line"></i>
                        {tourDetails?.distance} /km
                      </span>

                      <span>
                        <i class="ri-group-line"></i>
                        {tourDetails?.maxGroupSize} people
                      </span>
                    </div>

                    <h5>Description</h5>
                    <p>{tourDetails?.desc}</p>
                  </div>

                  <div className="tour__reviews mt-4">
                    <h4>Reviews ({tourDetails?.reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setTourRating(1)}>
                          1 <i class="ri-star-s-fill"></i>
                        </span>

                        <span onClick={() => setTourRating(2)}>
                          2 <i class="ri-star-s-fill"></i>
                        </span>

                        <span onClick={() => setTourRating(3)}>
                          3 <i class="ri-star-s-fill"></i>
                        </span>

                        <span onClick={() => setTourRating(4)}>
                          4 <i class="ri-star-s-fill"></i>
                        </span>

                        <span onClick={() => setTourRating(5)}>
                          5 <i class="ri-star-s-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          required
                          placeholder="Click on the rating u want to give and share u r thoughts"
                        />
                        <button
                          type="submit"
                          className="btn primary__btn text-white"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>

                    <ListGroup className="user__reviews">
                      {tourDetails?.reviews?.map((review, index) => (
                        <div key={index} className="review__item">
                          <img src={avatar} alt="avatar" />
                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date().toLocaleDateString(
                                    "en-US",
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center">
                                {review.rating} <i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            {user?.username === review.username ? (
                              <>
                                {editModeId === review._id ? (
                                  <>
                                    <textarea
                                      style={{
                                        width : "100%",
                                        padding : "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        marginTop: "10px",
                                      }}
                                      onChange={handleTextareaChange}
                                      value={isEditing ? editedReview : review.reviewText}
                                    />
                                    <button style={{marginTop : "10px"}} onClick={() => handleSave(review._id)} className="btn primary__btn text-white" type="button">Save</button>
                                  </>
                                ) : (
                                  <>
                                    <h6>{review.reviewText}</h6>
                                    {/* delete review */}
                                    {user?.username === review.username && (
                                      <div className="text-center">
                                        <button
                                          style={{ marginRight: 10 }}
                                          className="btn primary__btn text-white"
                                          type="button"
                                          onClick={() => {
                                            setEditModeId(review._id);
                                            setIsEditing(true);
                                            setEditedReview(review.reviewText);
                                          }}
                                        >
                                          Edit
                                        </button>
                                        <button
                                          onClick={() =>
                                            deleteReview(review._id)
                                          }
                                          className="btn primary__btn text-white"
                                          type="button"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <h6>{review.reviewText}</h6>
                            )}
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tourDetails} avgRating={avgRating} tourId={id} />
              </Col>
            </Row>
          </Container>
        </section>
      )}
      <Newsletter />
    </>
  );
};

export default TourDetails;
