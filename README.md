# CODE SPACE Final Proyect

## Presentation
Hi, i'm Alejandro Olaso and this is my final project for CodeSpace Academy. It's an e-commerce aplication that provides a complete user management system including registration and login functionality. It also includes CRUD operations on several database models and implements a REST API for communication between the frontend and backend.

## Requirements
Please check that you have installed:
- [Node.js](https://nodejs.org/es)
- [MongoDB](https://www.mongodb.com/es)
- [MongoDB Compass](https://www.mongodb.com/products/tools/compass)

## How To Install
### 1. First clone this repository:
```
git clone https://github.com/Alejjaandro/FinalProject.git
```
### 2. Then install both Backend and Frontend dependencies, they are listed below with more info.
Run in each dependency the following command:
```
npm install
```
### 3. Clone database:
Open your terminal on the project main directory and execute:
```
mongorestore -h 127.0.0.1:27017 .\dataBaseCollections\ -d dataBaseCollections
```
You will need [MongoDB Database Tools](https://www.mongodb.com/docs/database-tools/installation/installation/) to use `mongorestore` command.

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
- [multer:](https://github.com/expressjs/multer#readme) A node.js middleware primarily used for uploading files.

### Backend Structure
- Models: Define the structure of the data for a certain object (like users, products, etc.) and interact with the database.
- Routes: Define the endpoints of the API.
- Controllers: Handle the logic for each endpoint.
- Middleware: Handle tasks that should be done before the request hits the controller.

### API Endpoints

The backend provides several API endpoints grouped by their functionality:
1. Auth Routes:

| URL | TYPE | DESCRIPTION | ROLE |
| --- | --- | --- | --- |
| http://localhost:8000/api/auth/register | POST | Used to register a new user. | PUBLIC |
| http://localhost:8000/api/auth/login | POST | Used to log in an existing user. | PUBLIC |

Example of a user document - THIS IS THE DEFAULT ADMIN USER (Password: ***admin123***) - :

```
{
  "_id": {
    "$oid": "650eafbd73b2cef683dea0d8"
  },
  "name": "AdminUser",
  "lastname": "AdminUser",
  "username": "AdminUser",
  "email": "adminuser@admin.com",
  "password": "$2b$10$h5oQbt/q9xHjDL4sJ2n5YO5wxZCy2fnF.VYk4KPtj1cdBiiuqLXV.",
  "isAdmin": true,
  "createdAt": {
    "$date": "2023-09-23T09:28:29.217Z"
  },
  "updatedAt": {
    "$date": "2023-09-23T09:28:29.217Z"
  },
  "__v": 0
}
```
2. User Routes:

| URL | TYPE | DESCRIPTION | ROLE |
| --- | --- | --- | --- |
| http://localhost:8000/api/users/ | GET | Used to fetch all users. | ADMIN |
| http://localhost:8000/api/users/:userID | GET | Used to fetch a specific user. | USER, ADMIN |
| http://localhost:8000/api/users/:userID | PUT | Used to update a specific user's details. | USER |
| http://localhost:8000/api/users/adminUpdate/:userID | PUT | Used by admins to update a specific user's details. | ADMIN |

3. Products Routes:

| URL | TYPE | DESCRIPTION | ROLE |
| --- | --- | --- | --- |
| http://localhost:8000/api/products/ | GET | Used to fetch all products. | PUBLIC |
| http://localhost:8000/api/products/find/:id | GET | Used to fetch a specific product by its id. | PUBLIC |
| http://localhost:8000/api/products/ | POST | Used to create a new product. | ADMIN |
| http://localhost:8000/api/products/:id | PUT | Used to update a specific product's details. | ADMIN |
| http://localhost:8000/api/products/:id | DELETE | Used to delete a specific product. | ADMIN |

Example of a product document:
```
{
    "_id": {
      "$oid": "64d1196ffec7f4af5c10667f"
    },
    "title": "iPhone 9",
    "description": "An apple mobile which is nothing like apple",
    "price": 549,
    "discountPercentage": 12.96,
    "rating": 4.69,
    "stock": 93,
    "brand": "Apple",
    "category": "smartphones",
    "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
    "images": [
      "https://i.dummyjson.com/data/products/1/1.jpg",
      "https://i.dummyjson.com/data/products/1/2.jpg",
      "https://i.dummyjson.com/data/products/1/3.jpg",
      "https://i.dummyjson.com/data/products/1/4.jpg",
      "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
    ],
    "createdAt": {
      "$date": "2023-08-07T16:18:55.819Z"
    },
    "updatedAt": {
      "$date": "2023-08-29T10:09:48.564Z"
    },
    "__v": 0
  }
```

4. Cart Routes:

| URL | TYPE | DESCRIPTION | ROLE |
| --- | --- | --- | --- |
| http://localhost:8000/api/carts/ | GET | Used to fetch all carts. | ADMIN |
| http://localhost:8000/api/carts/find/:userID | GET | Used to fetch user cart. | USER, ADMIN |
| http://localhost:8000/api/carts/:userID | POST | Used to create a new cart for the user. | USER |
| http://localhost:8000/api/carts/:userID/:productID | DELETE | Used to delete a product from the user cart. | USER, ADMIN |
| http://localhost:8000/api/carts/:userID | DELETE | Used to delete completely the user cart. | USER, ADMIN |

Example of a Cart document:
```
{
    "_id": {
      "$oid": "64d8c2d85ea9fac06225e507"
    },
    "__v": 0,
    "createdAt": {
      "$date": "2023-09-04T16:57:00.078Z"
    },
    "products": [
      {
        "product": {
          "_id": "64d1196ffec7f4af5c10667f",
          "title": "iPhone 9",
          "description": "An apple mobile which is nothing like apple",
          "price": 549,
          "discountPercentage": 12.96,
          "rating": 4.69,
          "stock": 93,
          "brand": "Apple",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
          "images": [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
          ],
          "createdAt": "2023-08-07T16:18:55.819Z",
          "updatedAt": "2023-08-29T10:09:48.564Z",
          "__v": 0
        },
        "quantity": 1,
        "color": " - ",
        "ram": " - "
      }
    ],
    "updatedAt": {
      "$date": "2023-09-05T16:26:22.976Z"
    }
```

5. Orders Routes:

| URL | TYPE | DESCRIPTION | ROLE |
| --- | --- | --- | --- |
| http://localhost:8000/api/orders/ | GET | Used to fetch all orders. | ADMIN |
| http://localhost:8000/api/orders/findOrder/:orderID | GET | Used to fetch a specific order. | ADMIN |
| http://localhost:8000/api/orders/find/:userID | GET | Used to fetch all orders of a user. | USER |
| http://localhost:8000/api/orders | POST | Used to create a new order. | USER |
| http://localhost:8000/api/orders/:orderID | PUT | Used to update a specific order's details. | USER, ADMIN |
| http://localhost:8000/api/orders/:orderID | DELETE | Used to delete a specific order. | USER, ADMIN |

Example of a Order document:
```
{
    "_id": {
      "$oid": "64f610d92ac18266c7192dae"
    },
    "userId": {
      "$oid": "64d8c2d85ea9fac06225e507"
    },
    "products": [
      {
        "product": {
          "_id": "64d1196ffec7f4af5c10667f",
          "title": "iPhone 9",
          "description": "An apple mobile which is nothing like apple",
          "price": 549,
          "discountPercentage": 12.96,
          "rating": 4.69,
          "stock": 93,
          "brand": "Apple",
          "category": "smartphones",
          "thumbnail": "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
          "images": [
            "https://i.dummyjson.com/data/products/1/1.jpg",
            "https://i.dummyjson.com/data/products/1/2.jpg",
            "https://i.dummyjson.com/data/products/1/3.jpg",
            "https://i.dummyjson.com/data/products/1/4.jpg",
            "https://i.dummyjson.com/data/products/1/thumbnail.jpg"
          ],
          "createdAt": "2023-08-07T16:18:55.819Z",
          "updatedAt": "2023-08-29T10:09:48.564Z",
          "__v": 0
        },
        "quantity": 1,
        "color": " - ",
        "ram": " - "
      }
    ],
    "orderInfo": {
      "name": "antonio",
      "lastname": "perez",
      "email": "antonio@test.com",
      "address": "C/ example one",
      "country": "Austria",
      "city": "Burgenland",
      "state": "",
      "zipcode": "45678",
      "cardNumber": "765345698756",
      "expirationDate": "02/2027",
      "cvc": "789",
      "billingName": "Antonio Perez",
      "billingAddress": "C/ example three",
      "billingCountry": "Austria",
      "billingState": "",
      "billingCity": "Burgenland",
      "billingZipcode": "79008",
      "subtotal": 549,
      "shippingCost": 10.5,
      "total": 559.5
    },
    "status": "Pending",
    "createdAt": {
      "$date": "2023-09-04T17:16:09.332Z"
    },
    "updatedAt": {
      "$date": "2023-09-04T17:16:09.332Z"
    },
    "__v": 0
  },
```

### Environment Variables

The backend uses the following environment variables:

***On windows there is an error when trying to connect to the database using "mongodb://localhost:27017", so I used "mongodb://127.0.0.1:27017" instead.***
- MONGO_URL= URL of your MongoDB database.
- PORT: Port in wich the backend will run.
- JWT_KEY: The secret key for signing JSON Web Tokens.

These should be defined in a .env file in the root directory of the backend, like this:
```
MONGO_URL='mongodb://127.0.0.1:27017/final_project'
JWT_KEY=secretKey
PORT=8000
```

### Running the Backend

To run the backend, use the following command: 
```
npm start
```
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
- [react-country-region-selector:](https://github.com/country-regions/react-country-region-selector#readme) React components to display connected country and region dropdowns.
- [react-datepicker:](https://github.com/Hacker0x01/react-datepicker) Datepicker component for React.
- [react-modal:](https://github.com/reactjs/react-modal) Library to create simple modals for React.
- [@mui/material and @mui/icons-material:](https://mui.com/material-ui/material-icons/) React components for faster and easier web development, with Google's Material Design.

## Project Structure
- Components: Reusable parts of the user interface.
- Pages: Different sections of the website, each corresponding to a route.
- API: Axios configuration file.
- Context: Files that provide a way to pass data through the component tree without having to pass props down manually at every level.
- Middlewares: Files used to protect routes before entering them.
- Assets: Images used for backgrounds and other resources.

### Frontend Environment Variables

The frontend uses the following environment variables:
- baseURL: The URL of the backend API.

It is an axios setting file inside `/src/api`.

### Running the Frontend

To run the frontend, use the following command: 
```
npm start
```
This will start the server at <http://localhost:3000>.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License.
