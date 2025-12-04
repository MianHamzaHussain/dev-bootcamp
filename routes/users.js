import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/users.js';

import User  from '../models/User.js'

 
const router = express.Router({ mergeParams: true });

import advancedResults from '../middlewares/advancedResults.js';
import  { protect, authorize } from '../middlewares/auth.js';

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(User), getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router;

