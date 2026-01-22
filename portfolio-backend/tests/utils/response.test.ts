import { createSuccessResponse, createErrorResponse, createPaginatedResponse } from '../../src/utils/response';

describe('Response Utilities', () => {
  describe('createSuccessResponse', () => {
    it('should create a success response with data', () => {
      const data = { id: '123', name: 'Test' };
      const response = createSuccessResponse(data);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.error).toBeNull();
    });

    it('should create a success response with array data', () => {
      const data = [{ id: '1' }, { id: '2' }];
      const response = createSuccessResponse(data);

      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(2);
      expect(response.error).toBeNull();
    });

    it('should create a success response with null data', () => {
      const response = createSuccessResponse(null);

      expect(response.success).toBe(true);
      expect(response.data).toBeNull();
      expect(response.error).toBeNull();
    });

    it('should return frozen object', () => {
      const response = createSuccessResponse({ test: 'data' });
      expect(Object.isFrozen(response)).toBe(true);
    });
  });

  describe('createErrorResponse', () => {
    it('should create an error response with message', () => {
      const errorMessage = 'Something went wrong';
      const response = createErrorResponse(errorMessage);

      expect(response.success).toBe(false);
      expect(response.data).toBeNull();
      expect(response.error).toBe(errorMessage);
    });

    it('should handle empty error message', () => {
      const response = createErrorResponse('');

      expect(response.success).toBe(false);
      expect(response.error).toBe('');
    });

    it('should return frozen object', () => {
      const response = createErrorResponse('error');
      expect(Object.isFrozen(response)).toBe(true);
    });
  });

  describe('createPaginatedResponse', () => {
    it('should create a paginated response', () => {
      const data = [{ id: '1' }, { id: '2' }, { id: '3' }];
      const response = createPaginatedResponse(data, 100, 1, 10);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
      expect(response.total).toBe(100);
      expect(response.page).toBe(1);
      expect(response.limit).toBe(10);
    });

    it('should handle empty data array', () => {
      const response = createPaginatedResponse([], 0, 1, 10);

      expect(response.success).toBe(true);
      expect(response.data).toHaveLength(0);
      expect(response.total).toBe(0);
    });

    it('should return frozen object', () => {
      const response = createPaginatedResponse([], 0, 1, 10);
      expect(Object.isFrozen(response)).toBe(true);
    });
  });
});
