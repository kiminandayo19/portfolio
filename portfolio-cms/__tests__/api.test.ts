import { fetchBackend, ApiError } from '@/services/api';

global.fetch = jest.fn();

describe('fetchBackend', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('should return data on success', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: 'test' }),
    });

    const result = await fetchBackend('/test');
    expect(result).toEqual({ data: 'test' });
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:3001/test', expect.objectContaining({
      method: 'GET',
      headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
    }));
  });

  it('should throw ApiError on failure', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      json: async () => ({ message: 'Validation Error' }),
    });

    await expect(fetchBackend('/test')).rejects.toThrow('Validation Error');
  });

  it('should handle non-JSON error response', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: async () => { throw new Error() },
    });

    await expect(fetchBackend('/test')).rejects.toThrow('Internal Server Error');
  });
});
