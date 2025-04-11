import express from "express";
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import productRouter from "./routes/ProductRoutes.js";
import cors from "cors";
dotenv.config();
connectDb();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

app.use("/product", productRouter);


app.get('/', (req, res) => {
  res.status(200).json({ message: "🚀 Welcome to CRM Server" });
});
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`sever running at port http://localhost:${PORT}`);
});
