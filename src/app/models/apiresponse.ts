export class ApiResponse<T> {
  isSuccess!: boolean;
  message!: string;
  statusCode!: number;
  result!: T;
}
