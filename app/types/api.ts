export interface Pagination {
  page: number;
  size: number;
  total_pages: number;
  total_counts: number;
}

export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
  pagination: Pagination;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  path: string;
  timestamp: string;
  response_id?: string;
  response_service?: string;
}
