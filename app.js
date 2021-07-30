require("dotenv").config();
const express = require("express");
const app = express();
const userRouter = require("./api/users/user.router");
const productRouter = require("./api/product/product.router");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const orderRoute = require('./routes/orders');
const bodyParser = require('body-parser');


app.use("/api/users", userRouter);
app.use("/api/product", productRouter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api/products', productsRoute);
app.use('/api/users', usersRoute);
app.use('/api/orders', orderRoute);




app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
  allowedHeaders: 'Content-type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.APP_PORT || 3000;



app.listen(port, () => {
  console.log("server up and running on APP_PORT :", port);
});
module.exports = app;
