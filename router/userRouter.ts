import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { userRequest } from "../types";
const usersRouter = express.Router();

usersRouter.post("/", (async (
  req: Request<object, object, userRequest>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username: username,
    passwordHash: passwordHash,
    list: [],
  });

  try {
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err: unknown) {
    next(err);
  }
}) as express.RequestHandler);

export default usersRouter;
