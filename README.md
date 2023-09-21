# BankLingo App

Welcome to the BankLingo. This application aims to bridge the gap between complex financial terminology and everyday understanding. Many people struggle to comprehend banking terms such as "overdraft" and "bank loan," leading to potentially poor financial decisions. Our solution leverages AI to simplify these terms into layman's language and provides a structured learning plan to enhance financial literacy. Understanding financial terms and services is essential for financial success, and this application is designed to empower users, including the youth, to achieve just that.

## Features
-AI-Powered Jargon Simplification: The application utilizes AI to break down complex financial terms into easy-to-understand language.

-Time-Based Learning Plans: Users can choose from various learning plans based on their availability, whether it's 5 minutes, a week, or a month.

-Learning Progress Tracker: The application tracks users' progress, helping them visualize their journey towards financial literacy.

## Technologies Used
Frontend: Angular
Backend: Node.js
Database: PostgreSQL
AI Integration: Using ChatGPT API
DevOps: Docker, Render and vercel

## Installation and Setup
Follow these steps to set up the VocaSelect app locally:

Clone the Repository:
> git clone `https://github.com/your-username/BankLingo.git`
> cd BankLingo

Install Dependencies:
Navigate to the frontend directory and install frontend dependencies:

cd /Frontend
ng server --o

Move to the backend directory and install backend dependencies:

cd /Backend
npm install

Database Setup:
Create a PostgreSQL database and update the database configuration in backend/config/database.js. Environment Variables:

Create .env files in both the frontend and backend directories based on the provided .env.example files. Fill in the required information.

Run the App:
Start the application:
In the frontend directory, run the following command:
ng serve
In the backend directory, run the following command:
npm start
Access the App: Open a web browser and navigate to http://localhost:4200 to access the BankLingo app.

## Contributing
We welcome contributions from the community!
