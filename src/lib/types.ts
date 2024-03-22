export interface IResponseMappings<T> {
  statusCode?: number;
  message?: string;
  data?: T;
  success?: boolean;
  error?: string;
}
