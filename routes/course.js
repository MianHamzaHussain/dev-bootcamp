import express from "express"
import {getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse} from "../controllers/course.js"
  import Course from '../models/Course.js';
  import advanceResults from "../middlewares/advanceResults.js";

const router = express.Router({ mergeParams: true });



router
  .route('/')
  .get(
    advanceResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  .post(addCourse);

router
  .route('/:id')
  .get(getCourse)
  .put( updateCourse)
  .delete(deleteCourse);

export default router;
