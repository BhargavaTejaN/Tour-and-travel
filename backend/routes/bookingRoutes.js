import express from 'express';

import {verifyAdmin, verifyUser} from '../middleware/verifyToken.js';
import { createBooking, getBooking,getAllBookings, getAllUserBookings, deleteBooking } from '../controllers/bookingController.js';

const router = express.Router();

// create a new booking 
router.post('/',verifyUser,createBooking);

// get single booking
router.get('/:id',verifyUser,getBooking);

// get all bookings
router.get('/',verifyAdmin,getAllBookings);

// get all user bookings
router.get('/user/:userId',verifyUser,getAllUserBookings);

// delete a single booking
router.delete('/:id',verifyUser,deleteBooking);

export default router;