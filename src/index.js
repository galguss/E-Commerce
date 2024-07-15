require("dotenv").config();
const express = require("express");
const session = require("express-session");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./lib/connect");
const routes = require("./routes");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

// Create an express app
const app = express();

app.use(cookieParser());

app.use(
  session({
    secret: process.env.KEY_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// 
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Log all requests
app.use(morgan("dev"));

// Enable CORS
app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// All routes
app.use("/", routes);

app.get("/", (req, res) => {
  res.render("Index", { isLogged: req.session.isLogged });
});

app.listen(PORT, () => {
  connectDB();
  console.log(`The server is running on port: ${PORT}....`);
});
