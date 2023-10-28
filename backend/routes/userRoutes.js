import express from 'express';
import { createNewUser, deleteUser, getAllUsers, getSingleUser, updateUser } from '../controllers/userController.js';
import {verifyAdmin, verifyUser} from '../middleware/verifyToken.js';

const router = express.Router();

// create new user
router.post('/',createNewUser);

// update user
router.patch('/:id',verifyUser,updateUser);

// delete user
router.delete('/:id',verifyUser,deleteUser);

// get singel user
router.get('/:id',verifyUser,getSingleUser);

// get all users
router.get('/',verifyAdmin,getAllUsers);

export default router;