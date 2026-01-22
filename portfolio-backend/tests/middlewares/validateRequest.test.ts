import { Request, Response, NextFunction } from 'express';
import { validateRequest, profileSchema, experienceSchema, projectSchema, skillSchema } from '../../src/middlewares/validateRequest';

// Mock Express request/response
const mockRequest = (body: Record<string, unknown> = {}): Partial<Request> => ({
  body,
});

const mockResponse = (): Partial<Response> => {
  const res: Partial<Response> = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockNext: NextFunction = jest.fn();

describe('Validation Middleware', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('validateRequest factory', () => {
    it('should call next() when validation passes', () => {
      const schema = { required: ['name'], string: ['name'] };
      const middleware = validateRequest(schema);
      const req = mockRequest({ name: 'Test' });
      const res = mockResponse();

      middleware(req as Request, res as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
    });

    it('should return 400 when required field is missing', () => {
      const schema = { required: ['name'] };
      const middleware = validateRequest(schema);
      const req = mockRequest({});
      const res = mockResponse();

      middleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          error: expect.stringContaining("'name' is required"),
        })
      );
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when field is empty string', () => {
      const schema = { required: ['name'] };
      const middleware = validateRequest(schema);
      const req = mockRequest({ name: '' });
      const res = mockResponse();

      middleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 400 when field is wrong type (string expected)', () => {
      const schema = { string: ['name'] };
      const middleware = validateRequest(schema);
      const req = mockRequest({ name: 123 });
      const res = mockResponse();

      middleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining("'name' must be a string"),
        })
      );
    });

    it('should return 400 when field is wrong type (array expected)', () => {
      const schema = { array: ['items'] };
      const middleware = validateRequest(schema);
      const req = mockRequest({ items: 'not-an-array' });
      const res = mockResponse();

      middleware(req as Request, res as Response, mockNext);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          error: expect.stringContaining("'items' must be an array"),
        })
      );
    });

    it('should pass when optional field is undefined', () => {
      const schema = { string: ['optional'] };
      const middleware = validateRequest(schema);
      const req = mockRequest({});
      const res = mockResponse();

      middleware(req as Request, res as Response, mockNext);

      expect(mockNext).toHaveBeenCalled();
    });
  });

  describe('profileSchema', () => {
    it('should have all required profile fields', () => {
      expect(profileSchema.required).toContain('name');
      expect(profileSchema.required).toContain('title');
      expect(profileSchema.required).toContain('email');
      expect(profileSchema.required).toContain('linkedin');
      expect(profileSchema.required).toContain('location');
      expect(profileSchema.required).toContain('summary');
    });

    it('should validate all profile fields as strings', () => {
      expect(profileSchema.string).toContain('name');
      expect(profileSchema.string).toContain('email');
    });
  });

  describe('experienceSchema', () => {
    it('should have required experience fields', () => {
      expect(experienceSchema.required).toContain('role');
      expect(experienceSchema.required).toContain('company');
      expect(experienceSchema.required).toContain('period');
    });

    it('should validate description as array', () => {
      expect(experienceSchema.array).toContain('description');
    });
  });

  describe('projectSchema', () => {
    it('should have required project fields', () => {
      expect(projectSchema.required).toContain('title');
      expect(projectSchema.required).toContain('description');
      expect(projectSchema.required).toContain('tags');
    });

    it('should validate tags as array', () => {
      expect(projectSchema.array).toContain('tags');
    });

    it('should allow optional link field', () => {
      expect(projectSchema.required).not.toContain('link');
      expect(projectSchema.string).toContain('link');
    });
  });

  describe('skillSchema', () => {
    it('should have required skill fields', () => {
      expect(skillSchema.required).toContain('category');
      expect(skillSchema.required).toContain('items');
    });

    it('should validate items as array', () => {
      expect(skillSchema.array).toContain('items');
    });
  });
});
