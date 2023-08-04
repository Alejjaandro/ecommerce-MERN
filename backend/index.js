// ========== SETUP ========== //

// Import express as framework to build the backend.
const express = require('express');
const app = express();

// dotenv to access .env files that contains vital info.
const dotenv = require('dotenv');
dotenv.config();

// mongoose to connect to mongo DB. 
//We stablish the connection string and send a message if is successfully connected.
// catch the errors if it's not and show them on the terminal.
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL)
.then( () => console.log('-> DB Connected') )
.catch( (error) => console.log(error) );

// To read json files.
app.use(express.json());

// ========== ENDPOINTS ========== //

// Importing endpoints.
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');


// Using the endpoints. We stablish some prefix for organization.
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/orders', orderRoutes);

// Stablish what port should the app listen to and a message to show it works
app.listen(process.env.PORT || 4000, () => {
    console.log(`Backend running at http://localhost:4000/api`);
});