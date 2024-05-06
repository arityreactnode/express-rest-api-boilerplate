const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const helmet = require('helmet')
const cors = require("cors");
const apiResponse = require("./helpers/apiResponse");
const Routes = require("./routes");
const connectToDatabase = require("./helpers/db");

const app = express();

// Middleware
app.use(bodyParser.json());

//connect DB
connectToDatabase();

//Helmet!
app.use(helmet());
app.disable('x-powered-by')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//logger
app.use(logger("dev"));

// cors
app.use(cors());

// Routes
app.use("/images", express.static("images"));
app.use("/uploads", express.static("uploads"));
app.use("/api", Routes);
app.use("/images", (req, res, next) => {
  res.redirect(`/images/not-found.jpg`);
});

app.all("*", function (req, res) {
  return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res, next) => {
  if (err) {
    return apiResponse.errorResponse(res, err.message);
  }
  next(err);
});


// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = app;
