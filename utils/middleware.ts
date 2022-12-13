import { Request, Response, NextFunction } from "express";

export const requestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(`Method: ${req.method}, Path: ${req.path}`);
  console.log("---");
  next();
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: "Unknown Endpoint" });
};

export const errorHandler = (error: Error, _req: Request, res: Response) => {
  console.log("erorr handling");
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  return res.status(400).json({ error: "unknown error" });
};
