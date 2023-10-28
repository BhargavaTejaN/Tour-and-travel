import mongoose from "mongoose";

import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

// create a new review
export const createReview = async (req, res) => {
  try {
    const id = req.params.id;
    const { productId, username, reviewText, rating } = req.body;

    const emptyFields = [];

    if (!productId) emptyFields.push("productId");
    if (!username) emptyFields.push("username");
    if (!reviewText) emptyFields.push("reviewText");
    if (!rating) emptyFields.push("rating");

    if (emptyFields.length > 0) {
      return res.status(400).json({
        error: "please fill in all the fields",
        emptyFields,
        success: false,
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "No tour found with that ID",
      });
    }

    const newReview = await Review.create({
      productId,
      username,
      reviewText,
      rating,
    });

    // add the review to the tour array
    await Tour.findByIdAndUpdate(id,{
      $push : {reviews :newReview._id}
    })

    const updatedTour = await Tour.findById(id);

    res.status(200).json({
      success: true,
      data: {
        review : newReview,
        tour : updatedTour
      },
      message: "Review Submitted",
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Creating A Review in Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Create a Review",
      error: error.message,
    });
  }
};

// update a review
export const updateReview = async(req,res) => {
  try {

    const { id, editedReview } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const review = await Review.findById(id);

    // tour id
    const tourId = review.productId;

    if(!review){
      return res.status(400).json({
        success:false,
        message:"No such review exists"
      })
    }

    const updatedReview = await Review.findByIdAndUpdate(id,editedReview,{new : true});

    if(!updatedReview){
      return res.status(400).json({
        success:false,
        message:"Update Failed"
      })
    }

    const tour = await Tour.findById(tourId);

    if(!tour){
      return res.status(400).json({
        success:false,
        message:"Tour not found"
      })
    }

    // update the review in the review array of tour db
    const reviewIndex = tour.reviews.findIndex((review) => review._id.toString() === id);
    
    if(reviewIndex === -1){
      return res.status(400).json({
        success: false,
        message: "Review not found in the tour",
      });
    }

    // use set method method to update the specific review
    //tour.reviews.set(reviewIndex, editedReview);
    tour.reviews[reviewIndex] = Object.assign(tour.reviews[reviewIndex], editedReview);

    await tour.save();
    

    res.status(200).json({
      success: true,
      data: {
        tour
      },
      message: "Review Updated Successfully"
    })
    
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Updating Review in Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To update Review",
      error: error.message,
    });
  }
}

// delete a review
export const deleteReview = async(req,res) => {
  try {
    const {id} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const review = await Review.findById(id);

    if(!review){
      return res.status(404).json({
        success:false,
        message:"No Review Found"
      })
    }

    // tour id 
    const tourId = review.productId;

    const removeReview = await Review.findByIdAndDelete(id);

    if(!removeReview){
      return res.status(400).json({
        success:false,
        message:"Could not Delete The Review"
      })
    }

    // find the tour based on the tourId and delete the review in that tour as well
    const tour = await Tour.findById(tourId);

    if(!tour){
      return res.status(404).json({
        success:false,
        message:"Tour Not Found"
      })
    }

    tour.reviews = tour.reviews.filter((reviewId) => reviewId.toString() !== id);
    await tour.save();

    res.status(200).json({
      success: true,
      data: review,
      message : 'found the review'
    })

  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Deleting A Review in Backend : ",error);
    res.status(500).json({
      success : false,
      message : "Failed To Delete Review",
      error : error.message
    })
  }
}
