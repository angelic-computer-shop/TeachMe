import {
  createUserController,
  signInUserController,
  passwordResetOTPController,
  updatePasswordController,
  updateUserProfileController,
  updateUserSearchedBooleanController,
} from "../../controllers/UserControllers/user_controller.js";
import authenticateToken from "../../middleware/Authorization.js";
import express from "express";
const user_router = express.Router();

/**
 * @openapi
 * '/api/user/signup':
 *  post:
 *     tags:
 *     - User Route
 *     summary: Create a User
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - id
 *              - name
 *            properties:
 *              name:
 *                type: string
 *                default: string
 *              surname:
 *                type: string
 *                default: string
 *              age:
 *                 type: number
 *                 default: 0
 *              email:
 *                 type: string
 *                 default: string
 *              password:
 *                  type: string
 *                  default: string
 *     responses:
 *      201:
 *        description: Created
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */
user_router.post("/signup", createUserController);
/**
 * @openapi
 * '/api/user/signin':
 *  post:
 *     tags:
 *     - User Route
 *     summary: Sign in user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                 type: string
 *                 default: string
 *              password:
 *                  type: string
 *                  default: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */

user_router.post("/signin", signInUserController);

/**
 * @openapi
 * '/api/user/sendOTP':
 *  post:
 *     tags:
 *     - User Route
 *     summary: Send OTP For password Reset
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - email
 *            properties:
 *              email:
 *                 type: string
 *                 default: string
 *     responses:
 *      200:
 *        description: Success
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */

user_router.post("/sendOTP", passwordResetOTPController);

/**
 * @openapi
 * '/api/user/passwordReset/{id}':
 *  post:
 *     tags:
 *     - User Route
 *     summary: Reset Password
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
 *              - password
 *            properties:
 *              password:
 *                 type: string
 *                 default: string
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 */
user_router.post("/passwordReset/:id", updatePasswordController);

/**
 * @openapi
 '/api/user/update_profile/{id}':
 *  put:
 *     tags:
 *     - User Route
 *     summary: Update Profile
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
 *              - user_id
 *            properties:
 *              name:
 *                 type: string
 *                 default: string
 *              surname:
 *                 type: string
 *                 default: string
 *              email:
 *                 type: string
 *                 default: string
 *              contact_number:
 *                 type: string
 *                 default: string
 *              profile_picture:
 *                 type: string
 *                 default: string
 *              age:
 *                 type: number
 *                 default: 0
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 */
user_router.put(
  "/update_profile/:user_id",
  authenticateToken,
  updateUserProfileController
);

/**
 * @openapi
 * '/api/user/update_boolean':
 *  put:
 *     tags:
 *     - User Route
 *     summary: Update Boolean
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - user_id
 *            properties:
 *              searchedbefore:
 *                 type: Boolean
 *                 default: false
 *              email:
 *                 type: string
 *                 default: string
 *     responses:
 *      200:
 *        description: Success
 *      500:
 *        description: Internal Server Error
 *      400:
 *        description: Bad Request
 */

user_router.put(
  "/update_boolean",
  authenticateToken,
  updateUserSearchedBooleanController
);

export default user_router;
