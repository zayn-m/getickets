import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { BadRequestError } from "../errors/bad-request.error";
import { User } from "../models/user";
import { Password } from "../services/password";

const signinController = async (req: Request, res: Response) => {
  console.log('signinController');
  
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (!existingUser) {
    throw new BadRequestError('You have provided invalid credentials');
  }

  const passwordMatch = await Password.compare(existingUser.password, password);

  if (!passwordMatch) {
    throw new BadRequestError('You have provided invalid credentials');
  }
  
  // Generate JWT
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY || 'topsecretkey');

  req.session = {
    jwt: userJwt
  };

  res.status(200).send(existingUser);
};

export { signinController };
