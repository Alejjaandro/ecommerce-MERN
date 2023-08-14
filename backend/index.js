// ========== SETUP ========== //

// Import express as framework to build the backend.
import express from 'express';
const app = express();

// dotenv to access .env files that contains vital info.
import dotenv from 'dotenv';
dotenv.config();

// cors to allow access the api from any origin.
import cors from 'cors';

// Cookieparser to read requests cookies.
import cookieParser from 'cookie-parser';
app.use(cookieParser());


// mongoose to connect to mongo DB. 
//We stablish the connection string and send a message if is successfully connected.
// catch the errors if it's not and show them on the terminal.
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL)
.then( () => console.log('-> DB Connected') )
.catch( (error) => console.log(error) );

// To read json files.
app.use(express.json());

app.use(cors());

// ========== ENDPOINTS ========== //

// Importing endpoints.
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';


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