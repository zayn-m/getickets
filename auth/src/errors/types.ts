interface CustomError {
  statusCode: number;
  serializeErrors(): {
    message: string;
    field?: string
  }[]
}

export default CustomError;