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

// Stablish what port shuld the app listen to and a message to show it works
app.listen(process.env.PORT || 4000, () => {
    console.log('Backend running');
});