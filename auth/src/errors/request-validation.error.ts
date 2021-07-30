import { ValidationError } from 'express-validator';
import { CustomError } from './custom.error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  
  constructor(public errors: ValidationError[]) {
    super('Invalid body request');

    // Only because we are extending built-in class in TS
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map(error => {
      return { message: error.msg, field: error.param }
    });
  }
}