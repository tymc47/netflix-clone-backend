import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel";
import { userRequest } from "../types";
const usersRouter = express.Router();

usersRouter.post("/", (async (
  req: Request<object, object, userRequest>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "missing username or passowrd" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const newUser = new User({
    username: username,
    passwordHash: passwordHash,
    list: [],
  });

  const savedUser = await newUser.save();

  return res.status(201).json(savedUser);
}) as express.RequestHandler);

export default usersRouter;
