import express from "express";
const search_router = express.Router();

import {
  searchHistoryController,
  getSearchHistoryLimitController,
  deleteSearchHistoryByIdController,
} from "../../controllers/SearchControllers/search_controller.js";
import authenticateToken from "../../middleware/Authorization.js";

/**
 * @openapi
 * '/api/search/store_search/{id}':
 *  post:
 *     tags:
 *     - Search Storing
 *     summary: Store the searched values on the DB
 *     parameters:
 *      - name: id
 *        in: path
 *        description: user_id
 *        required: true
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - message
 *            properties:
 *              query_searched:
 *                type: string
 *                default: string
 *              response_searched:
 *                type: string
 *                default: string
 *              ishumour:
 *                type: Boolean
 *                default: false
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */

search_router.post(
  "/store_search/:user_id",
  authenticateToken,
  searchHistoryController
);

/**
 * @openapi
 * '/api/search/get_history/{id}':
 *  get:
 *     tags:
 *     - Search Storing
 *     summary: Get search history for user
 *     parameters:
 *      - name: id
 *        in: path
 *        description: user_id
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */

search_router.get(
  "/get_history/:user_id",
  authenticateToken,
  getSearchHistoryLimitController
);

/**
 * @openapi
 * '/api/search/delete_favorite/{id}':
 *  delete:
 *     tags:
 *     - Search Storing
 *     summary: Delete a favorite searched
 *     parameters:
 *      - name: id
 *        in: path
 *        description: id
 *        required: true
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */

search_router.delete(
  "/delete_favorite/:id",
  authenticateToken,
  deleteSearchHistoryByIdController
);

export default search_router;
