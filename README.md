# CODE SPACE Final Proyect

## Description

This application provides a complete user management system including registration and login functionality. It also includes CRUD operations on several database models and implements a REST API for communication between the frontend and backend.

## Technologies Used

- Backend: Express.js.
- Frontend: React.js.
- Database: MongoDB and MongoDB Compass.
- Other Libraries: bcrypt, jsonwebtoken, mongoose, cors, cookie-parser, morgan.

## Data API

Although the project was made thinking in a technology e-commerce, the products of the web were take from a public API:
<https://dummyjson.com/products>, that contains products of all type.
Anyway, the web allows admins to add and delete products so you can change it manually or, if you have a JSON file with technology products you can just add them directly to your mongoDB collection of products as is explained below.

## How To Install

### 1. Node.js and npm

Node.js is a JavaScript runtime that allows you to run JavaScript on your server. npm (Node Package Manager) is a tool that will allow you to install libraries (like Express.js and React.js) that your project depends on.

- Download and install [Node.js](https://nodejs.org/es) from the official website. npm is included with Node.js.
- Verify the installation by running `node -v` and `npm -v` in your terminal. You should see the installed versions of Node.js and npm.

### 2. Express.js

Express.js is a web application framework for Node.js. It simplifies the process of building web applications.

- You can install [Express.js](https://expressjs.com/) in your project by running `npm install express` in your project directory.

### 3. React.js

[React.js](https://es.react.dev/) is a JavaScript library for building user interfaces.

- You can create a new React.js application by running `npx create-react-app your-app-name` in your terminal. Replace "your-app-name" with the name you want to give to your application.
- Navigate into your new project directory with `cd your-app-name`.

### 4. MongoDB and MongoDB Compass

1. MongoDB is a NoSQL database. You can use it to store your application's data.

   - Download and install [MongoDB](https://www.mongodb.com/es) from the official website.
   - Follow the instructions in the MongoDB installation wizard.

2. [MongoDB Compass](https://www.mongodb.com/products/tools/compass) is a graphical user interface for MongoDB. It allows you to visually explore your data, run ad-hoc queries, interact with your data with full CRUD functionality, and view real-time server statistics.

Here's how you can install MongoDB Compass:

   1. Download MongoDB Compass: Visit the MongoDB Download Center and select the version of MongoDB Compass that is compatible with your operating system.

   2. Install MongoDB Compass: Open the downloaded file and follow the installation wizard. The steps will vary depending on your operating system:

      - Windows: Run the MongoDB Compass installer that you downloaded. Follow the installation wizard to complete the installation.
      - macOS: Open the MongoDB Compass .dmg file that you downloaded. Drag the MongoDB Compass application to your Applications folder.
      - Linux: Extract the .tar.gz file you downloaded. Run the MongoDB Compass binary inside the extracted directory.

   3. Launch MongoDB Compass: You can start MongoDB Compass by finding it in your installed applications and clicking on it.

   4. Connect to your MongoDB database: In MongoDB Compass, you can connect to your MongoDB database by entering your connection string in the connection dialog. If you're running MongoDB locally, you can use the connection string "mongodb://localhost:27017".

Remember, MongoDB Compass is just a tool to interact with your MongoDB databases. You still need to have MongoDB installed and running on your machine or have access to a MongoDB database on a server.

All the data in your MongoDB database is stored in JSON-like documents (in this case inside /dataBaseCollections). You can import JSON data into MongoDB Compass by following these steps:

   1. Open MongoDB Compass: Start MongoDB Compass and connect to your MongoDB instance.

   2. Select Database and Collection: In the left-hand panel, select the database into which you want to import data. If the database doesn't exist, you can create it by clicking on "CREATE DATABASE". Then, select the collection you want to import data into. If the collection doesn't exist, you can create it by clicking on "CREATE COLLECTION".

   3. Import Data: Click on the "Collection" tab in the top menu, then select "Import Data".

   4. Choose File and Format: In the dialog box that appears, click on "Select File" and navigate to the JSON file you want to import. Make sure the "JSON" option is selected as the import format.

   5. Import: Click on the "Import" button to start the import process. MongoDB Compass will import the data from the JSON file into the selected collection.

Remember, the JSON file should contain an array of documents that you want to import. Each document should be a separate object in the array, like the data in your users.json file.

### 5. Other Libraries

The project also uses several other libraries. You can install all of them at once by navigating to your project directory in the terminal and running `npm install` and the library name. All the libraries are listed in their respective sections below.

After installing these technologies, you can clone the project repository with git clone repository-url.

Then, navigate into the project directory with cd project-directory.

Finally, install the project's dependencies with npm install.

## Backend Documentation

### Backend Dependencies

- [Dotenv:](https://github.com/motdotla/dotenv#readme) A zero-dependency module that loads environment variables from a .env file into process.env.
- [Cors:](https://github.com/expressjs/cors#readme) A Node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
- [Cookie-parser:](https://github.com/expressjs/cookie-parser#readme) A middleware which parses cookies attached to the client request object.
- [Morgan:](https://github.com/expressjs/morgan#readme) An HTTP request logger middleware for Node.js.
- [Bcrypt:](https://github.com/kelektiv/node.bcrypt.js#readme) A library to help you hash passwords.
- [Jsonwebtoken:](https://github.com/auth0/node-jsonwebtoken#readme) An implementation of JSON Web Tokens.
- [zod:](https://zod.dev/) A TypeScript-first schema declaration and validation library.
- [nodemon:](https://nodemon.io/) Simple monitor script for use during development of a Node.js app.

### Backend Structure

The backend is structured into models, routes, controllers, and middleware.

- Models: Define the structure of the data for a certain object (like users, products, etc.) and interact with the database.
- Routes: Define the endpoints of the API.
- Controllers: Handle the logic for each endpoint.
- Middleware: Handle tasks that should be done before the request hits the controller.

### API Endpoints

The backend provides several API endpoints grouped by their functionality:

1. /api/auth: This endpoint is responsible for user authentication. It includes two main routes:

   - POST `/api/auth/register/` - This route is used to register a new user. It expects a JSON body with user details such as username, email, and password.

   - POST `/api/auth/login/` - This route is used to log in an existing user. It expects a JSON body with email and password.

2. /api/users: This endpoint handles user-related operations. It includes several routes:

   - GET `/api/users/` - This route is used to fetch all users. It's typically used for admin purposes.
   - GET `/api/users/:userId` - This route is used to fetch a specific user by their id.

   - PUT `/api/users/:userId` - This route is used to update a specific user's details. It expects a JSON body with the details to be updated.
   - PUT `/api/users/adminUpdate/:userId` - This route is used by admins to update a specific user's details. It expects a JSON body with the details to be updated.

   - DELETE `/api/users/:userId` - This route is used to delete a specific user by their id.

3. /api/products: This endpoint handles product-related operations. It includes several routes:

   - GET `/api/products/` - This route is used to fetch all products.
   - GET `/api/products/find/:id` - This route is used to fetch a specific product by its id.

   - POST `/api/products/` - This route is used by admins to create a new product. It expects a JSON body with product details such as name, description, price, and image.

   - PUT `/api/products/:id` - This route is used to update a specific product's details. It expects a JSON body with the details to be updated.

   - DELETE `/api/products/:id` - This route is used by admins to delete a specific product by its id.

4. /api/carts: This endpoint handles cart-related operations. It includes several routes:

   - GET `/api/carts/` - This route is used by admins to fetch all carts.
   - GET `/api/carts/find/:userId` - This route is used to fetch a specific user cart by its id. The "Id" of the cart is the "id" of the user.

   - POST `/api/carts/:userId` - This route is used to create a new cart for the user. It expects a JSON body with cart details such as userId and products (an array of products). The same route is used to update the cart of the user when he chages it.

   - DELETE `/api/carts/:userId/:productId` - This route is used to delete a specific product from the user cart.
   - DELETE `/api/carts/:userId` - This route is used to delete completely the user cart.

5. /api/orders: This endpoint handles order-related operations. It includes several routes:

   - GET `/api/orders/` - This route is used by admins to fetch all orders.
   - GET `/api/orders/findOrder/:orderId` - This route is used by admins to fetch a specific order by its id.
   - GET `/api/orders/find/:userId` - This route is used to fetch all orders of a specific user by his id.

   - POST `/api/orders/` - This route is used to create a new order. It expects a JSON body with order details such as userId, products (an array of products), and orderInfo (object that contains user adress and other information of the order like the total price).

   - PUT `/api/orders/:orderId` - This route is used to update a specific order's details. It expects a JSON body with the details to be updated.

   - DELETE `/api/orders/:orderId` - This route is used to delete a specific order by its id.

Remember, for routes that require authentication, you'll need to include a valid JWT (JSON Web Token) in the Authorization header of your request. The token is typically obtained from the `/api/auth/` endpoint.

### Environment Variables

The backend uses the following environment variables:

- MONGO_URL: The connection string for the MongoDB database.
- JWT_KEY: The secret key for signing JSON Web Tokens.
- ADMIN_KEY: The key for creating admin users.

These should be defined in a .env file in the root directory of the backend.

### Running the Backend

To run the backend, use the following command: `npm start`.
This will start the server at <http://localhost:8000/api>.

## Frontend Documentation

### Frotend Dependencies

- [Axios:](https://axios-http.com/) A promise-based HTTP client for the browser and Node.js.
- [React Router Dom:](https://github.com/remix-run/react-router#readme) A collection of navigational components that compose declaratively with your application.
- [React Datepicker:](https://github.com/Hacker0x01/react-datepicker) A simple and reusable datepicker component for React.
- [React Country Region Selector:](https://github.com/country-regions/react-country-region-selector#readme) Country / region react dropdown selector for forms.
- [JWT Decode:](https://github.com/auth0/jwt-decode#readme) Allows you to decode, verify and generate JWT.
- [JS Cookie:](https://github.com/auth0/jwt-decode#readme) A simple, lightweight JavaScript API for handling browser cookies.
- [Date-fns:](https://github.com/date-fns/date-fns#readme) Modern JavaScript date utility library.
- [@mui/material and @mui/icons-material:](https://mui.com/material-ui/material-icons/) React components for faster and easier web development, with Google's Material Design.

## Project Structure

The frontend is structured into components, pages, and API calls.

- Components: Reusable parts of the user interface.
- Pages: Different sections of the website, each corresponding to a route.
- API: Functions for making requests to the backend.

### Frontend Environment Variables

The frontend uses the following environment variables:

- baseURL: The URL of the backend API.

It is defined in the axios setting file inside `/src/api`.

### Running the Frontend

To run the frontend, use the following command: `npm start`.
This will start the server at <http://localhost:3000>.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.
