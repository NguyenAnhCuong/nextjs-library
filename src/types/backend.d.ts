export {};

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }
  interface IBackendRes<T> {
    error?: string | string[];
    message: string;
    statusCode: number | string;
    data?: T;
  }

  interface IBook {
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
    ratings_count: number;
  }
}
