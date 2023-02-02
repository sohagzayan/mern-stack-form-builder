const express = require("express");
const errorHandlerGard = require("./middleware/error");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Route import
const user = require("./routes/userRoute");

app.use("/api/v1", user);

app.use(errorHandlerGard);

module.exports = app;
