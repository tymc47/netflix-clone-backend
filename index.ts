import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import loginRouter from "./router/loginRouter";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";
import tokenRouter from "./router/tokenRouter";
// import mongoose from "mongoose";

const app = express();
app.use(express.static("frontend-build"));
app.use(cors());
app.use(express.json());
app.use(requestLogger);

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use("/api/users", tokenRouter);
app.use("/api/login", loginRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
