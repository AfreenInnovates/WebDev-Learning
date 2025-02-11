import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app = express();

app.use(cors());

// OR (For specific origins, allow only your frontend)
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ Allows URL-encoded body parsing

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT || 5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
