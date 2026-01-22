import { ApiResponse } from '../types';

// Pure function to create success response
export const createSuccessResponse = <T>(data: T): ApiResponse<T> =>
  Object.freeze({
    success: true,
    data,
    error: null,
  });

// Pure function to create error response
export const createErrorResponse = (error: string): ApiResponse<null> =>
  Object.freeze({
    success: false,
    data: null,
    error,
  });

// Pure function to create paginated response
export const createPaginatedResponse = <T>(
  data: readonly T[],
  total: number,
  page: number,
  limit: number
) =>
  Object.freeze({
    success: true,
    data,
    total,
    page,
    limit,
  });
