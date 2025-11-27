import express from "express"
import {getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse} from "../controllers/course.js"

const router = express.Router({ mergeParams: true });

const advancedResults = require('../middleware/advancedResults');


router
  .route('/')
  .get(
    advancedResults(Course, {
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

module.exports = router;
