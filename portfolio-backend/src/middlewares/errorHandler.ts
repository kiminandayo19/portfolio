import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from '../utils/response';
import { config } from '../config';

export interface AppError extends Error {
  readonly statusCode?: number;
  readonly isOperational?: boolean;
}

// Error handler middleware
export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;

  // Safe error message - don't leak internal details in production
  const message = config.isProduction && statusCode === 500
    ? 'Internal server error'
    : err.message;

  // Log error in development
  if (config.isDevelopment) {
    console.error('Error:', err);
  }

  res.status(statusCode).json(createErrorResponse(message));
};

// Not found handler
export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  res.status(404).json(createErrorResponse(`Route ${req.originalUrl} not found`));
};

// Async handler wrapper to catch errors
export const asyncHandler = <T>(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
