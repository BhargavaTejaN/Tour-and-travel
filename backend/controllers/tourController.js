import Tour from "../models/Tour.js";
import mongoose from "mongoose";

// new tour
export const createTour = async (req, res) => {
  const {
    title,
    city,
    address,
    distance,
    photo,
    desc,
    price,
    maxGroupSize,
    reviews,
    featured,
  } = req.body;

  const emptyFields = [];

  if (!title) emptyFields.push("title");
  if (!city) emptyFields.push("city");
  if (!address) emptyFields.push("address");
  if (!distance) emptyFields.push("distance");
  if (!photo) emptyFields.push("photo");
  if (!desc) emptyFields.push("desc");
  if (!price) emptyFields.push("price");
  if (!maxGroupSize) emptyFields.push("maxGroupSize");

  if (emptyFields.length > 0) {
    return res.status(400).json({
      error: "please fill in all the fields",
      emptyFields,
      success: false,
    });
  }

  try {
    const newTour = await Tour.create({
      title,
      city,
      address,
      distance,
      photo,
      desc,
      price,
      maxGroupSize,
      reviews,
      featured,
    });
    res.status(200).json({
      success: true,
      message: "Tour Successfully created",
      data: newTour,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      const errorFields = Object.keys(error.errors);
      const errorMessage = error.message;
      return res
        .status(400)
        .json({ success: false, error: errorMessage, errorFields });
    }
    console.log("Error While Creating a new Tour in Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to Create New Tour",
      error: error.message,
    });
  }
};

// update tour
export const updateTour = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      city,
      address,
      distance,
      photo,
      desc,
      price,
      maxGroupSize,
      reviews,
      featured,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const updateTourId = await Tour.findById(id);

    if (!updateTourId) {
      return res.status(400).json({
        success: false,
        message: "No Tour Found",
      });
    } else {
      const updatedFields = {
        title,
        city,
        address,
        distance,
        photo,
        desc,
        price,
        maxGroupSize,
        reviews,
        featured,
      };

      const updateTour = await Tour.findByIdAndUpdate(id, updatedFields, {
        new: true,
      });

      if (!updateTour) {
        return res.status(400).json({
          success: false,
          message: "Failed to update the tour.",
        });
      }

      res.status(200).json({
        success: true,
        message: "Successful",
        data: {
          updateTour,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed To Update The Tour",
      error: error.message,
    });
  }
};

// delete tour
export const deleteTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const findTour = await Tour.findById(id);

    if (!findTour) {
      return res.status(400).json({
        success: false,
        message: "No such tour found",
      });
    } else {
      const removeTour = await Tour.findByIdAndDelete(id);
      if (!removeTour) {
        return res.status(400).json({
          success: false,
          message: "Error in deleting the tour",
        });
      } else {
        res.status(200).json({
          success: true,
          message: "Tour Deleted SuccessFully",
        });
      }
    }
  } catch (error) {
    console.log("Failed To Delete The Tour In Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Delete The Tour",
      error: error.message,
    });
  }
};

// get single tour
export const getSingleTour = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ID",
      });
    }

    const tour = await Tour.findById(id).populate("reviews");

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "No Such Tour Found!",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Successful",
        data: tour,
      });
    }
  } catch (error) {
    console.log("Failed to fetch Single Tour from backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to Fetch Single Tour",
      error: error.message,
    });
  }
};

// get all tours
export const getAllTours = async (req, res) => {
  try {
    // for pagination
    const page = parseInt(req.query.page);

    const tours = await Tour.find({})
      .populate("reviews")
      .skip(page * 8)
      .limit(8);

    if (tours.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Tours Found",
      });
    }

    return res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    console.log("Failed to fetch All Tours from backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed to Fetch All Tours",
      error: error.message,
    });
  }
};

// get tour by search
export const getTourBySearch = async (req, res) => {
  try {
    // i is for case-sensitive i.e converts to lowercase
    const city = new RegExp(req.query.city, "i");
    const distance = parseInt(req.query.distance);
    const maxGroupSize = parseInt(req.query.maxGroupSize);

    const tours = await Tour.find({
      city,
      distance: { $gte: distance },
      maxGroupSize: { $gte: maxGroupSize },
    }).populate("reviews");

    if (tours.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Tours found",
      });
    }

    return res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    console.log(
      "Error While Searching The Tour By Search in Backend : ",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed To Search The Tour",
      error: error.message,
    });
  }
};

// get featured tours
export const getFeaturedTours = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).populate("reviews").limit(8);

    if (tours.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Featured Tours Found",
      });
    }

    return res.status(200).json({
      success: true,
      count: tours.length,
      message: "Successful",
      data: tours,
    });
  } catch (error) {
    console.log("Error While Fetching Featured Tours in Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Get Featured Tours",
      error: error.message,
    });
  }
};

// get tours count
export const getTourCount = async (req, res) => {
  try {
    const tourCount = await Tour.estimatedDocumentCount();
    res.status(200).json({
      success: true,
      data: tourCount,
      message: "success",
    });
  } catch (error) {
    console.log("Error While Fetching TourCount in Backend : ", error);
    res.status(500).json({
      success: false,
      message: "Failed To Get Tour Count",
      error: error.message,
    });
  }
};
