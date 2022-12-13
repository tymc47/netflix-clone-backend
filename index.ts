import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import usersRouter from "./router/userRouter";
import {
  errorHandler,
  requestLogger,
  unknownEndpoint,
} from "./utils/middleware";
// import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(requestLogger);

const PORT = 3000;

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use("/api/users", usersRouter);
app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
