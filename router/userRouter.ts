import express, { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { Show } from "../types";
const usersRouter = express.Router();

export interface userRequest {
  username: string;
  password: string;
}

usersRouter.post("/", (async (
  req: Request<object, object, userRequest>,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "missing username or passowrd" });

  if (password.length < 4 || password.length > 60)
    return res.status(400).json({ error: "invalid password" });

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = new User({
      username: username,
      passwordHash: passwordHash,
      list: [],
    });

    const savedUser = await newUser.save();

    const userForToken = {
      username: savedUser.username,
      id: savedUser._id,
    };

    const token = jwt.sign(userForToken, process.env.SECRET!);

    return res.status(201).json({ token, username: savedUser.username });
  } catch (err) {
    next(err);
  }

  return;
}) as express.RequestHandler);

interface mylistRequest {
  showToToggle: Show;
}

usersRouter.put("/", (async (
  req: Request<object, object, mylistRequest>,
  res: Response,
  next: NextFunction
) => {
  const { showToToggle } = req.body;
  const token = req.token;
  try {
    const decodedToken = token ? jwt.verify(token, process.env.SECRET!) : null;
    if (!decodedToken || typeof decodedToken !== "object" || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    console.log(decodedToken.id);

    const user = await User.findById(decodedToken.id);

    if (user) {
      if (user.list.some((item) => item.id === showToToggle.id)) {
        user.list = user.list.filter((item) => item.id !== showToToggle.id);
      } else {
        user.list.push(showToToggle);
      }
    }

    await user?.save();

    return res.status(201).json({ newList: user?.list });
  } catch (err) {
    next(err);
  }

  return;
}) as express.RequestHandler);

export default usersRouter;
