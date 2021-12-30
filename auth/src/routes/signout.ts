import express, { Request, Response } from 'express';
import { signoutController } from '../controllers/signout.controller';

const router = express.Router();

router.post('/api/users/signout', (req: Request, res: Response) => {
  return signoutController(req, res);
});

export { router as signoutRouter };