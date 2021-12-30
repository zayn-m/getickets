import express, { Request, Response } from "express";
import { body } from "express-validator";
import { signinController } from "../controllers/signin.controller";
import { validateRequest } from "../middlewares/validate-request";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be provided"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage('You must provide a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
      return signinController(req, res);
  }
);

export { router as signinRouter };
