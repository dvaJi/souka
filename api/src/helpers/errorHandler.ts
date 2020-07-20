import * as httpStatus from 'http-status';
import { Request, Response } from 'express';

// handle not found errors
export const notFound = (req: Request, res: Response): void => {
  res.status(httpStatus.NOT_FOUND);
  res.json({
    success: false,
    message: 'Requested Resource Not Found',
  });
  res.end();
};

interface ErrorObject {
  message: string;
  extra: string;
  status: number;
}

// handle internal server errors
export const internalServerError = (err: ErrorObject, req: Request, res: Response): void => {
  res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
  res.json({
    message: err.message,
    extra: err.extra,
    errors: err,
  });
  res.end();
};
