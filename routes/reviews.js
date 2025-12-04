import express from 'express';
import {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview
} from'../controllers/reviews.js'

import Review from '../models/Review.js'
import advancedResults from '../middlewares/advancedResults.js';
import  { protect, authorize } from '../middlewares/auth.js';

const router = express.Router({ mergeParams: true });

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

/**
 * @swagger
 * /reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieves a list of all reviews. Can be filtered by bootcamp. Supports advanced filtering, sorting, and pagination.
 *     tags: [Reviews]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Field to sort by. Prefix with '-' for descending.
 *         example: -rating
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
 *         description: A list of reviews.
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
 *                     $ref: '#/components/schemas/Review'
 * /bootcamps/{bootcampId}/reviews:
 *   get:
 *     summary: Get all reviews for a specific bootcamp
 *     description: Retrieves a list of all reviews for a single bootcamp.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: bootcampId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the bootcamp.
 *     responses:
 *       200:
 *         description: A list of reviews for the specified bootcamp.
 */

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description'
    }),
    getReviews
  )
  /**
   * @swagger
   * /bootcamps/{bootcampId}/reviews:
   *   post:
   *     summary: Add a review for a bootcamp
   *     description: Adds a new review for a specific bootcamp. Requires user role. A user can only add one review per bootcamp.
   *     tags: [Reviews]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: bootcampId
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the bootcamp to add the review to.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               title:
   *                 type: string
   *                 example: "A great experience"
   *               text:
   *                 type: string
   *                 example: "I learned so much and the instructors were fantastic."
   *               rating:
   *                 type: number
   *                 description: A rating from 1 to 10.
   *                 example: 9
   *     responses:
   *       201:
   *         description: Review created successfully.
   *       400:
   *         description: Bad Request (e.g., user has already reviewed this bootcamp).
   *       401:
   *         description: Not authorized to add a review.
   *       404:
   *         description: Bootcamp not found.
   */
  .post(protect, authorize('user', 'admin'), addReview);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     summary: Get a single review
 *     description: Retrieves a single review by its ID.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID.
 *     responses:
 *       200:
 *         description: Successful response with review data.
 *       404:
 *         description: Review not found.
 *   put:
 *     summary: Update a review
 *     description: Updates a review. Requires ownership or admin role.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "An updated review"
 *               text:
 *                 type: string
 *                 example: "My thoughts have changed slightly, but still a great place."
 *     responses:
 *       200:
 *         description: Review updated successfully.
 *       401:
 *         description: Not authorized to update this review.
 *       404:
 *         description: Review not found.
 *   delete:
 *     summary: Delete a review
 *     description: Deletes a review. Requires ownership or admin role.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The review ID.
 *     responses:
 *       200:
 *         description: Review deleted successfully.
 *       401:
 *         description: Not authorized to delete this review.
 *       404:
 *         description: Review not found.
 */
router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);

export default router;
