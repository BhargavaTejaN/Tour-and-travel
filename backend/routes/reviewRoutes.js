
import express from 'express';
import {createReview, deleteReview, updateReview} from '../controllers/reviewController.js';
import {verifyUser} from '../middleware/verifyToken.js';

const router = express.Router();

// post a new review
router.post('/:id',verifyUser,createReview);

// update a review
router.put('/',updateReview);

// delete a review
router.delete('/',deleteReview);

export default router;