import { ErrorRequestHandler } from 'express';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/error';


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  console.log('globalErrorHandler~', err)
    
  let statusCode = 500;
  let message = 'Something went Wrong';
  let errorMessages: IGenericErrorMessage[] = [];
  if (err instanceof Error.ValidationError) {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof Error.CastError) {
    const simplifiedError = handleCastError(err);
    
    (statusCode = simplifiedError.statusCode),
      (errorMessages = simplifiedError.errorMessages),
      (message = simplifiedError.message);
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: err?.stack
  });
};

export default globalErrorHandler;
