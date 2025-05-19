import { Request, Response, NextFunction } from "express";

export const uncaughtErrorHandling = (
  err: Error,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    res.status(500).send("Ooops! Something went wrong.");
  } else {
    next();
  }
};
