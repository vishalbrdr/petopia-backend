require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");

// My routes
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const petRoutes = require("./routes/petRoute");

const app = express();
const server = http.createServer(app);
// const io = new Server(server);

// connecting to database...
const URI = process.env.MONGO_URI;
mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then(() => {
    console.log("DB CONNECTED SUCCESSFULY");
  })
  .catch((err) => {
    console.error("DB CONNECTION FAILED", err);
  });

// middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", petRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Petopia hei</h1>");
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log("SERVER IS UP AND RUNNING AT PORT:", PORT);
});
