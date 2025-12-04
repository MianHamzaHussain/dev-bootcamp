import express from "express"
import {getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse} from "../controllers/courses.js"
  import Course from '../models/Course.js';
  import advancedResults from "../middlewares/advancedResults.js";
  import  { protect, authorize } from "../middlewares/auth.js";


const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     description: Retrieves a list of all courses. Supports advanced filtering, sorting, field selection, and pagination.
 *     tags: [Courses]
 *     parameters:
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to include.
 *         example: title,description,weeks
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by. Prefix with '-' for descending.
 *         example: -tuition
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination.
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page.
 *         example: 10
 *     responses:
 *       200:
 *         description: A list of courses.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 pagination:
 *                   type: object
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Course'
 */

router
  .route('/')
  .get(
    advancedResults(Course, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getCourses
  )
  /**
   * @swagger
   * /bootcamps/{bootcampId}/courses:
   *   post:
   *     summary: Create a new course for a bootcamp
   *     description: Adds a new course to a specific bootcamp. Requires publisher or admin role.
   *     tags: [Courses]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: bootcampId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the bootcamp to add the course to.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Course'
   *     responses:
   *       201:
   *         description: Course created successfully.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Course'
   *       401:
   *         description: Not authorized to add a course to this bootcamp.
   *       404:
   *         description: Bootcamp not found.
   */
  .post(protect, authorize('publisher', 'admin'), addCourse);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a single course
 *     description: Retrieves a single course by its ID.
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID.
 *     responses:
 *       200:
 *         description: Successful response with course data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Course not found.
 *   put:
 *     summary: Update a course
 *     description: Updates a course's details. Requires ownership or admin role.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully.
 *       401:
 *         description: Not authorized to update this course.
 *       404:
 *         description: Course not found.
 *   delete:
 *     summary: Delete a course
 *     description: Deletes a course. Requires ownership or admin role.
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The course ID.
 *     responses:
 *       200:
 *         description: Course deleted successfully.
 *       401:
 *         description: Not authorized to delete this course.
 *       404:
 *         description: Course not found.
 */
router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

export default router;
