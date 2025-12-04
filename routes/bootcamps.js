import express from 'express';

import {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload
} from '../controllers/bootcamps.js'

import Bootcamp from '../models/Bootcamp.js';

// Include other resource routers
import courseRouter from './courses.js';
import reviewRouter from './reviews.js';

import advancedResults from '../middlewares/advancedResults.js';
import  { protect, authorize } from '../middlewares/auth.js';


const router = express.Router();



// Re-route into other resource routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

/**
 * @swagger
 * tags:
 *   name: Bootcamps
 *   description: Bootcamp management and browsing
 */

/**
 * @swagger
 * /bootcamps/radius/{zipcode}/{distance}:
 *   get:
 *     summary: Get bootcamps within a radius
 *     description: Retrieves all bootcamps within a specified distance from a central zipcode.
 *     tags: [Bootcamps]
 *     parameters:
 *       - in: path
 *         name: zipcode
 *         required: true
 *         schema:
 *           type: string
 *         description: The zipcode to search from.
 *         example: "02215"
 *       - in: path
 *         name: distance
 *         required: true
 *         schema:
 *           type: integer
 *         description: The distance in miles from the zipcode.
 *         example: 10
 *     responses:
 *       200:
 *         description: A list of bootcamps within the radius.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Bootcamp'
 */
router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

/**
 * @swagger
 * /bootcamps/{id}/photo:
 *   put:
 *     summary: Upload a photo for a bootcamp
 *     description: Upload a bootcamp photo. Requires publisher or admin role.
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bootcamp ID.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded successfully.
 *       400:
 *         description: Bad Request (e.g., no file, wrong file type).
 *       401:
 *         description: Not authorized to access this route.
 *       404:
 *         description: Bootcamp not found.
 */
router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

/**
 * @swagger
 * /bootcamps:
 *   get:
 *     summary: Get all bootcamps
 *     description: Retrieves a list of all bootcamps. Supports advanced filtering, sorting, field selection, and pagination.
 *     tags: [Bootcamps]
 *     parameters:
 *       - in: query
 *         name: select
 *         schema:
 *           type: string
 *         description: Comma-separated list of fields to include.
 *         example: name,description
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by. Prefix with '-' for descending.
 *         example: -averageCost
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
 *         description: A list of bootcamps.
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
 *                     $ref: '#/components/schemas/Bootcamp'
 *   post:
 *     summary: Create a new bootcamp
 *     description: Adds a new bootcamp to the database. Requires publisher or admin role. A user can only create one bootcamp unless they are an admin.
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bootcamp'
 *     responses:
 *       201:
 *         description: Bootcamp created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bootcamp'
 *       400:
 *         description: Bad Request (e.g., validation error, user already has a bootcamp).
 *       401:
 *         description: Not authorized to access this route.
 */
router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

/**
 * @swagger
 * /bootcamps/{id}:
 *   get:
 *     summary: Get a single bootcamp
 *     description: Retrieves a single bootcamp by its ID.
 *     tags: [Bootcamps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bootcamp ID.
 *     responses:
 *       200:
 *         description: Successful response with bootcamp data.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bootcamp'
 *       404:
 *         description: Bootcamp not found.
 *   put:
 *     summary: Update a bootcamp
 *     description: Updates a bootcamp's details. Requires ownership or admin role.
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bootcamp ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bootcamp'
 *     responses:
 *       200:
 *         description: Bootcamp updated successfully.
 *       401:
 *         description: Not authorized to update this bootcamp.
 *       404:
 *         description: Bootcamp not found.
 *   delete:
 *     summary: Delete a bootcamp
 *     description: Deletes a bootcamp. Requires ownership or admin role.
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The bootcamp ID.
 *     responses:
 *       200:
 *         description: Bootcamp deleted successfully.
 *       401:
 *         description: Not authorized to delete this bootcamp.
 *       404:
 *         description: Bootcamp not found.
 */
router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

export default router;
