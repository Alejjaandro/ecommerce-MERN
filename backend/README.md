# Backend Documentation

This project is a full-stack application with a backend built using Node.js, Express.js, and MongoDB. The backend is responsible for handling HTTP requests, interacting with the MongoDB database, and providing a RESTful API for the frontend.

## Technologies Used

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- Express.js: A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- MongoDB: A source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- Dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.
- Cors: A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- Cookie-parser: A middleware which parses cookies attached to the client request object.
- Morgan: An HTTP request logger middleware for Node.js.
- Bcrypt: A library to help you hash passwords.
- Jsonwebtoken: An implementation of JSON Web Tokens.

## Project Structure

The backend is structured into models, routes, controllers, and middleware.

- Models: Define the structure of the data for a certain object (like users, products, etc.) and interact with the database.
- Routes: Define the endpoints of the API.
- Controllers: Handle the logic for each endpoint.
- Middleware: Handle tasks that should be done before the request hits the controller.

## API Endpoints

The backend provides several API endpoints grouped by their functionality:

- Auth: Handles user registration and login.
- Users: Handles CRUD operations for users.
- Products: Handles CRUD operations for products.
- Carts: Handles operations for user carts.
- Orders: Handles operations for user orders.

## Running the Backend

To run the backend, use the following command: npm start

This will start the server at <http://localhost:8000/api>.

## Environment Variables

The backend uses the following environment variables:

- MONGO_URL: The connection string for the MongoDB database.
- JWT_KEY: The secret key for signing JSON Web Tokens.
- ADMIN_KEY: The key for creating admin users.

These should be defined in a .env file in the root directory of the backend.
Conclusion

This backend provides a robust API for the frontend, handling all necessary CRUD operations and user authentication.
