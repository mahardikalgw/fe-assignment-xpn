export interface IValidationError {
  response: {
    data: {
      email: string,
      password: string
    }
  }
}