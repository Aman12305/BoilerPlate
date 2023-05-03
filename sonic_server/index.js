import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.js";


mongoose.set("strictQuery", true);

const app = express();
dotenv.config();

app.use("/api/images", express.static("images"));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a pinga API");
});

app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));

// app.listen(PORT,()=>{
//     console.log(`Server is listen on Port: ${PORT}`)
// })
