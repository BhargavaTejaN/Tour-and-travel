import express from 'express';
import { createTour, deleteTour, getAllTours, getFeaturedTours, getSingleTour, getTourBySearch, getTourCount, updateTour } from '../controllers/tourController.js';
import {verifyAdmin} from '../middleware/verifyToken.js';

const router = express.Router();

// create new tour
router.post("/",verifyAdmin,createTour);

// update a tour
router.patch("/:id",verifyAdmin,updateTour);

// delete tour
router.delete("/:id",verifyAdmin,deleteTour);

// get single tour
router.get("/:id",getSingleTour);

// get all tours
router.get("/",getAllTours);

// get tours by search
router.get("/search/getTourBySearch",getTourBySearch);

// get featured tours
router.get("/search/getFeaturedTours",getFeaturedTours);

// get tourCount
router.get('/search/getTourCount',getTourCount);

export default router;