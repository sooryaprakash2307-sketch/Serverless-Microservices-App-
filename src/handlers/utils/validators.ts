export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: Record<string, string>;
}

export const successResponse = <T>(data: T, statusCode: number = 200) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({
    success: true,
    data,
  } as ApiResponse<T>),
});

export const errorResponse = (statusCode: number, error: string, errors?: Record<string, string>) => ({
  statusCode,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  body: JSON.stringify({
    success: false,
    error,
    errors,
  } as ApiResponse<null>),
});
