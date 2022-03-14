import { validationResult } from "express-validator";
import { logger } from "../config/winston.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  logger.error(errors);
  return res.status(400).json({ msg: errors.array()[0].msg });
};
