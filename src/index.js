const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const { connectDB } = require("./lib/connect");
const routes = require("./routes");

const app = express();

const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", routes);

app.get("/", (req, res) => {
  res.render("Index", { isLogged: req.session.isLogged });
});

app.listen(PORT, () => {
    connectDB();
    console.log(`The server is running on port: ${PORT}....`);
  });
  