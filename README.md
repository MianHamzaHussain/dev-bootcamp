# DevCamp API

This is the backend REST API for the DevCamp application, a directory for coding bootcamps. It allows users to manage bootcamps, courses, reviews, and user authentication.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)

## Features

- CRUD operations for Bootcamps and Courses
- User authentication and authorization with JWT
- Role-based access control (user, publisher, admin)
- Password reset functionality via email
- Geospatial queries for finding bootcamps within a certain radius
- Photo uploads for bootcamps

## Prerequisites

- [Node.js](https://nodejs.org/) (>=14.x)
- [MongoDB](https://www.mongodb.com/) (either local or a cloud service like MongoDB Atlas)

## Installation

1.  Clone the repository:
    ```bash
    git clone <your-repo-url>
    cd devcamp-api
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Create a `config/config.env` file by copying the `example.env` file:
    ```bash
    cp example.env config/config.env
    ```

4.  Fill in the environment variables in `config/config.env` with your own values. See the Environment Variables section for more details.

5.  (Optional) Import the seed data into your database. The project includes data for bootcamps, courses, and users.
    ```bash
    # Import all data
    node seeder -i

    # Destroy all data
    node seeder -d
    ```
    *Note: The seeder script logic is inferred and may need to be created if it doesn't exist.*

## API Documentation

This project uses Swagger for interactive API documentation. Once the server is running, you can access the documentation at:

**http://localhost:5000/api-docs**


## Environment Variables

Create a file named `config.env` inside a `config` directory and add the following variables.

```env
NODE_ENV=development
PORT=5000

# Database
MONGO_URI=<YOUR_MONGO_DB_URI>

# Geocoder
GEOCODER_PROVIDER=mapquest
GEOCODER_API_KEY=<YOUR_GEOCODER_API_KEY>

# File Uploads
FILE_UPLOAD_PATH=./public/uploads
MAX_FILE_UPLOAD=1000000

# JWT
JWT_SECRET=<YOUR_JWT_SECRET>
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

# Email
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=<YOUR_SMTP_EMAIL>
SMTP_PASSWORD=<YOUR_SMTP_PASSWORD>
FROM_EMAIL=noreply@devcamper.io
FROM_NAME=DevCamper

# Swagger API Documentation
API_VERSION=1.0.0
CONTACT_NAME=DevCamper Support
CONTACT_EMAIL=support@devcamper.io
SERVER_URI=http://localhost:5000
```

## Running the Application

### Development

To run the server in development mode with auto-reloading via `nodemon`:

```bash
npm run dev
```

### Production

To run the server in production mode:

```bash
npm start
```

## API Endpoints

All endpoints are prefixed with `/api/v1`.

### Auth

- `POST /auth/register` - Register a new user.
- `POST /auth/login` - Login a user and get a token.
- `GET /auth/logout` - Logout the current user.
- `GET /auth/me` - Get the currently logged-in user.
- `PUT /auth/updatedetails` - Update user details.
- `PUT /auth/updatepassword` - Update user password.
- `POST /auth/forgotpassword` - Request a password reset.
- `PUT /auth/resetpassword/:resettoken` - Reset password.

### Bootcamps

- `GET /bootcamps` - Get all bootcamps.
- `GET /bootcamps/:id` - Get a single bootcamp.
- `POST /bootcamps` - Create a new bootcamp (Private: publisher, admin).
- `PUT /bootcamps/:id` - Update a bootcamp (Private: owner, admin).
- `DELETE /bootcamps/:id` - Delete a bootcamp (Private: owner, admin).
- `GET /bootcamps/radius/:zipcode/:distance` - Get bootcamps within a radius.
- `PUT /bootcamps/:id/photo` - Upload a photo for a bootcamp (Private: owner, admin).

### Courses

- `GET /bootcamps/:bootcampId/courses` - Get all courses for a bootcamp.
- `GET /courses` - Get all courses.
- `GET /courses/:id` - Get a single course.
- `POST /bootcamps/:bootcampId/courses` - Add a course to a bootcamp (Private: owner, admin).
- `PUT /courses/:id` - Update a course (Private: owner, admin).
- `DELETE /courses/:id` - Delete a course (Private: owner, admin).
