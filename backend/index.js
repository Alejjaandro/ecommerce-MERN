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

// Using morgan to see on the console the petitions made to backend.
import morgan from 'morgan';

// mongoose to connect to mongo DB. 
//We stablish the connection string and send a message if is successfully connected.
// catch the errors if it's not and show them on the terminal.
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL)
.then( () => console.log('-> DB Connected') )
.catch( (error) => console.log(error) );

app.use(cors({ 
    origin: ['http://localhost:3000', 'https://classy-bunny-6c9b1e.netlify.app', 'https://sprightly-monstera-dc2542.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(cookieParser());
app.use(morgan('dev'));

// To read json files.
app.use(express.json());

// ========== ENDPOINTS ========== //
// Importing endpoints.
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/order.js';

// Using the endpoints. We stablish some prefix for organization.
app.get("/", (req, res) => {
    res.send({ message: "Successfully connected!" });
});

app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);

// Serve static files from the "images" directory
app.use('/productImages', express.static('assets/productImages'));

// Stablish what port should the app listen to and a message to show it works.
const PORT = process.env.PORT;
app.listen(PORT || 8000, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});