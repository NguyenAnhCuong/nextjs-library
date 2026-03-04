export {};

declare global {
  interface IPaginationMeta {
    pages: number;
    total: number;
    page: number;
    pageSize: number;
  }

  interface IPaginatedResponse<T> {
    result: T[];
    meta: IPaginationMeta;
  }
  interface IRequest {
    url: string;
    method: string;
    body?: Record<string, unknown>;
    queryParams?: Record<string, string | number | boolean | undefined>;
    useCredentials?: boolean;
    headers?: Record<string, string>;
    nextOption?: RequestInit;
  }

  interface IBackendRes<T = unknown> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IBook {
    _id: string;
    title: string;
    authors: string;
    thumbnail: string;
    description: string;
    published_year: string;
    average_rating: number;
    ratings_count: number;
    categories: string[];
    subtitle: string;
    num_pages: number;
  }

  interface IFollowBook {
    _id: string;
    userId: string;
    bookId: IBook;
  }
}
