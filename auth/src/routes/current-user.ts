import express, { Request, Response } from "express";
import { currentUserController } from "../controllers/current-user.controller";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  requireAuth,
  (req: Request, res: Response) => {
    return currentUserController(req, res);
  }
);

export { router as currentUserRouter };
