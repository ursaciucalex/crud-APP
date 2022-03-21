const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const path = require('path');

require('dotenv/config');

//Connect To DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log('connected to DB!');
});
app.use(cors());
app.listen(3000,()=>  {console.log('Server is running on http://localhost:${3000}')});

const routes = require('./routes/routes');
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// project routes
app.use('/crud', routes);