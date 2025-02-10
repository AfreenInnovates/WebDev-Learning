const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const userRoute = require("./routes/userRoute");
const cors = require("cors");

dotenv.config();

// Configure CORS to allow requests from http://localhost:3000
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Allow these HTTP methods
    credentials: true, // Allow cookies and credentials
  })
);

app.use(express.json());

mongoose
  .connect(process.env.URI)
  .then(() => {
    app.listen(process.env.PORT || 8000, (err) => {
      if (err) console.log(err);
      console.log("running successfully at", process.env.PORT);
    });
    console.log("CONNECTED TO MONGODB SUCCESSFULLY!");
  })
  .catch((error) => {
    console.log("Error:", error);
  });

app.use(userRoute);
