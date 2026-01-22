import { Request, Response, NextFunction } from 'express';
import { createErrorResponse } from '../utils/response';

// Type for validation schema
export interface ValidationSchema {
  readonly required?: readonly string[];
  readonly string?: readonly string[];
  readonly array?: readonly string[];
}

// Pure function to validate request body
const validateBody = (
  body: Record<string, unknown>,
  schema: ValidationSchema
): readonly string[] => {
  const errors: string[] = [];

  // Check required fields
  schema.required?.forEach((field) => {
    if (body[field] === undefined || body[field] === null || body[field] === '') {
      errors.push(`Field '${field}' is required`);
    }
  });

  // Check string fields
  schema.string?.forEach((field) => {
    if (body[field] !== undefined && typeof body[field] !== 'string') {
      errors.push(`Field '${field}' must be a string`);
    }
  });

  // Check array fields
  schema.array?.forEach((field) => {
    if (body[field] !== undefined && !Array.isArray(body[field])) {
      errors.push(`Field '${field}' must be an array`);
    }
  });

  return errors;
};

// Factory function to create validation middleware
export const validateRequest = (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validateBody(req.body, schema);

    if (errors.length > 0) {
      res.status(400).json(createErrorResponse(errors.join(', ')));
      return;
    }

    next();
  };

// Validation schemas for each resource
export const profileSchema: ValidationSchema = Object.freeze({
  required: ['name', 'title', 'email', 'linkedin', 'location', 'summary'],
  string: ['name', 'title', 'email', 'linkedin', 'location', 'summary'],
});

export const experienceSchema: ValidationSchema = Object.freeze({
  required: ['role', 'company', 'period'],
  string: ['role', 'company', 'period'],
  array: ['description'],
});

export const projectSchema: ValidationSchema = Object.freeze({
  required: ['title', 'description', 'tags'],
  string: ['title', 'description', 'link'],
  array: ['tags'],
});

export const skillSchema: ValidationSchema = Object.freeze({
  required: ['category', 'items'],
  string: ['category'],
  array: ['items'],
});
