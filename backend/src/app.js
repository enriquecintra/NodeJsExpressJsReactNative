var bodyParser = require('body-parser');
const express = require('express');
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Rotas
const index = require('./routes/index');
const authRoute = require('./routes/auth.route');
const userRoute = require('./routes/user.route');
const dealRoute = require('./routes/deal.route');
app.use('/', index);
app.use('/authenticate', authRoute);
app.use('/user', userRoute);
app.use('/deal', dealRoute);
module.exports = app;