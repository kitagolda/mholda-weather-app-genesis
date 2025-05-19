import { z } from "zod";
import { Request, Response } from "express";

export const validateFormData = (schema: z.ZodTypeAny) => {
  return (req: Request, res: Response, next: Function) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res
        .status(200)
        .send(
          "Invalid input: " +
            result.error.errors.map((e) => e.message).join(", ")
        );
    }

    req.body = result.data;
    next();
  };
};
