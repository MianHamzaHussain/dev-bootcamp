import express from "express"
import {createBootcamp,getBootcamps,getBootcamp,updateBootcamp,deleteBootcamp,getBootcampsInRadius} from "../controllers/bootcamp.js"
import courseRouter from "./course.js"
import Bootcamp from "../models/Bootcamp.js";
import advanceResults from "../middlewares/advanceResults.js";

const router=express.Router();

// redirect to courses
router.use('/:bootcampId/courses',courseRouter)
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius)
router.route('/').get(advanceResults(Bootcamp),getBootcamps).post(createBootcamp);
router.route('/:id').get(getBootcamp).put(updateBootcamp).delete(deleteBootcamp);

export default router;