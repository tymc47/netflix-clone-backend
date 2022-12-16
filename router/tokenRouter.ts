import { NextFunction, Request, Response, Router } from "express";
import userRouter from "./userRouter";

declare module "express-serve-static-core" {
  interface Request {
    token?: string;
  }
}

const tokenExtractor = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer "))
    req.token = authorization.substring(7);
  return next();
};
// Export the base-router
const tokenRouter = Router();

// Setup routers
tokenRouter.use("/", tokenExtractor, userRouter);

// Export default.
export default tokenRouter;
