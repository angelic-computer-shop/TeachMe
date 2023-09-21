# Documentation For BankLingo REST API.

Link to the Swagger Documentation :
[BankLingo Online Documentation](https://banklingoapi.onrender.com/banklingodocs/)

# ENDPOINTS

## USER

| Description    | Method |                           URL |
| -------------- | :----: | ----------------------------: |
| Register       |  POST  |              /api/user/signup |
| Login          |  POST  |              /api/user/signin |
| Send OTP       |  POST  |             /api/user/sendOTP |
| Password Reset |  POST  |  /api/user/passwordReset/{id} |
| Update Profile |  PUT   | /api/user/update_profile/{id} |
| Update Boolean |  PUT   |      /api/user/update_boolean |

## GPT

| Description           | Method |                  URL |
| --------------------- | :----: | -------------------: |
| Prompt AI             |  POST  |             /api/gpt |
| Prompt AI With Humour |  POST  |      /api/gpt/humour |
| Prompt Inside Topic   |  POST  | /api/gpt/insideTopic |

## Lesson Plan

| Description                  | Method |                          URL |
| ---------------------------- | :----: | ---------------------------: |
| CREATE LESSON PLAN           |  POST  |              /api/gpt/create |
| Delete A lesson Plan         | DELETE |    /api/gpt/delete_plan/{id} |
| Get plans associated by user |  GET   | /api/gpt/get_user_plans/{id} |
| Increment Days               |  GET   |    /api/gpt/update_days/{id} |

## Topics

| Description               | Method |                          URL |
| ------------------------- | :----: | ---------------------------: |
| Generate Topics From plan |  POST  |      /api/gpt/generateTopics |
| Get a single Topic        |  GET   |    /api/gpt/delete_plan/{id} |
| Update Covered Days       |  PUT   | /api/gpt/get_user_plans/{id} |

## Search Storing

| Description             | Method |                              URL |
| ----------------------- | :----: | -------------------------------: |
| Store favorite searches |  POST  |    /api/search/store_search/{id} |
| Get search history      |  GET   |     /api/search/get_history/{id} |
| Delete favorite         | DELETE | /api/search/delete_favorite/{id} |

# Technologies and Dependencies Used.

| Dependencies                   |
| ------------------------------ |
| "bcrypt": "^5.1.0",            |
| "body-parser": "^1.20.2",      |
| "cloudinary": "^1.40.0",       |
| "cors": "^2.8.5",              |
| "dotenv": "^16.3.1",           |
| "express": "^4.18.2",          |
| "jsonwebtoken": "^9.0.1",      |
| "morgan": "^1.10.0",           |
| "nodemailer": "^6.9.4",        |
| "nodemon": "^3.0.1",           |
| "openai": "^3.3.0",            |
| "pg": "^8.11.2",               |
| "swagger-autogen": "^2.23.5",  |
| "swagger-jsdoc": "^6.2.8",     |
| "swagger-ui-express": "^5.0.0" |
