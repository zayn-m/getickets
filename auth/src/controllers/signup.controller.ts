import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request.error';
import { RequestValidationError } from '../errors/request-validation.error';
import { User } from '../models/user';

const signUpController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    console.log("Email is already in use");
    throw new BadRequestError("Email is already in use");
  }

  console.log("Creating new user with email " + email);
  const user = User.build({ email, password });
  await user.save();

  // Generate JWT
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email
  }, process.env.JWT_KEY || 'topsecretkey');

  req.session = {
    jwt: userJwt
  };

  res.status(201).send(user);
};

export {
  signUpController
}
