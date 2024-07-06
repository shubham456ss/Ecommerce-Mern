import express from "express";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve()

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./client/build')))

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname,'./client/build/index.html'))
// });

const PORT = process.env.PORT || 8080;
//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on port ${PORT}`
  );
});
