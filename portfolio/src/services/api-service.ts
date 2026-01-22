/**
 * Base API Service for Backend Integration.
 * This service handles communication between the Next.js server and the Express.js backend.
 * Following integration-dev.md rules: Server-to-Server communication only.
 */

export const fetchBackend = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const baseUrl = process.env.BACKEND_URL;
  const apiToken = process.env.INTERNAL_API_TOKEN;

  if (!baseUrl) {
    throw new Error('BACKEND_URL is not defined in environment variables');
  }

  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (apiToken) {
    defaultHeaders['Authorization'] = `Bearer ${apiToken}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      // Ensure we use next.js fetch caching/revalidation features if needed
      next: {
        ...(options.next || {}),
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Backend API Error: ${response.status} ${response.statusText}`, errorData);
      throw new Error(errorData.error || `Backend Integration Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error(`Fetch Backend Error [${url}]:`, error);
    throw error;
  }
};
