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

// Importing endpoints.
const userRoutes = require('./routes/user');

// To read json files.
app.use(express.json());

// Using the endpoints. We stablish '/api/user' as prefix.
app.use('/api/users', userRoutes);

// Stablish what port should the app listen to and a message to show it works
app.listen(process.env.PORT || 4000, () => {
    console.log(`Backend running at http://localhost:4000/api`);
});