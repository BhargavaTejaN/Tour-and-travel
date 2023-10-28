import mongoose from "mongoose";

import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";

// create a new booking
export const createBooking = async (req, res) => {
  const {
    userId,
    tourId,
    tourName,
    userEmail,
    fullName,
    guestsSize,
    phone,
    bookAt,
    totalCost,
  } = req.body;

  const emptyFields = [];

  if (!fullName) emptyFields.push("fullName");
  if (!guestsSize) emptyFields.push("guestsSize");
  if (!phone) emptyFields.push("phone");
  if (!bookAt) emptyFields.push("bookAt");
  if (!totalCost) emptyFields.push("totalCost");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "please fill in all the fields",
      emptyFields,
      success: false,
    });
  }

  try {
    const newBooking = await Booking.create({
      userId,
      tourId,
      tourName,
      userEmail,
      fullName,
      guestsSize,
      phone,
      bookAt,
      totalCost,
    });
    res.status(200).json({
      success: true,
      message: "Your Tour Is Booked!",
      data: newBooking,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Making A New Booking : ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to Make A New Booking",
    });
  }
};

// get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid ID",
    });
  }

  try {
    const bookingDetails = await Booking.findById(id);

    if (!bookingDetails) {
      return res.status(404).json({
        success: false,
        message: "No Booking Found",
      });
    }

    // tour id
    const tourId = bookingDetails.tourId;

    if (!tourId) {
      return res.status(404).json({
        success: false,
        message: "Invalid TourID Found",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Tour ID",
      });
    }

    const tour = await Tour.findOne({ _id: tourId.toString() });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour Not Found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        bookingDetails: bookingDetails,
        tour: tour,
      },
      message: "success",
    });
  } catch (error) {
    console.log("Error While Getting The Booking in Backend : ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed To Get The Booking",
    });
  }
};

// get all bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});

    if (bookings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Bookings Available",
      });
    }

    return res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    console.log("Error While Fetching All Bookings in Backend : ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch all bookings",
    });
  }
};

// get all bookings of an user
export const getAllUserBookings = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is missing in the request parameters",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid USER ID",
      });
    }

    const bookings = await Booking.find({ userId: userId.toString() });

    if (bookings.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Bookings Found For This User",
      });
    }

    const bookingDetails = [];
    for (let i = 0; i < bookings.length; i++) {
      const tourId = bookings[i].tourId;

      if (!mongoose.Types.ObjectId.isValid(tourId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid Tour ID",
        });
      }

      const tour = await Tour.findOne({ _id: tourId.toString() });

      if (!tour) {
        continue;
      }

      const bookingWithTourDetails = {
        ...bookings[i]._doc,
        tourDetails: {
          _id: tour._id,
          title: tour.title,
          photo: tour.photo,
          city: tour.city,
          price: tour.price,
          featured: tour.featured,
          reviews: tour.reviews,
        },
      };
      bookingDetails.push(bookingWithTourDetails);
    }

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookingDetails,
      message: "success",
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Fetching User Bookings : ", error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to fetch user's bookings",
    });
  }
};

// delete a single booking
export const deleteBooking = async(req,res) => {
  try {

    const id = req.params.id;

    if(!id){
      return res.status(400).json({
        success: false,
        message: "Booking ID is missing in the request parameters",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid BOOKING ID",
      });
    }

    const booking = await Booking.findById(id);

    if(!booking){
      return res.status(404).json({
        success: false,
        message: 'No Booking Found',
      })
    }

    const deleteBooking = await Booking.findByIdAndDelete(id);

    if(!deleteBooking){
      return res.status(404).json({
        success: false,
        message: 'Unable To Delete The Booking',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Successfully Deleted A Booking',
    })
    
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Deleting Booking in Backend : ",error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: "Failed to delete the booking"
    })
  }
};
