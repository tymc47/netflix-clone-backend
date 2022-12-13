import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import express, { RequestHandler, Request, Response } from "express";
import User from "../models/userModel";
import { userRequest } from "../types";
const loginRouter = express.Router();

loginRouter.post("/", (async (
  req: Request<object, object, userRequest>,
  res: Response
) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "missing username or passowrd" });

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET!);

  return res.status(200).send({ token, username: user.username });
}) as RequestHandler);

export default loginRouter;
