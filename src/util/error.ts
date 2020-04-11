enum StatusCode {
  Conflict = 'E_CONFLICT',
  Forbidden = 'E_FORBIDDEN',
  Unauthorized = 'E_UNAUTHORIZED',
  NotFound = 'E_NOT_FOUND',
  UnprocessableEntity = 'E_UNPROCESSABLE_ENTITY',
}

export class HttpError extends Error {
  public status: number
  public code: StatusCode

  constructor(code: StatusCode, message: string, status: number) {
    super(message)

    Error.captureStackTrace(this, this.constructor)

    this.name = this.constructor.name
    this.status = status
    this.code = code
  }
}

export class ValidationError extends HttpError {
  constructor(message: string = 'Unprocessable Entity') {
    super(StatusCode.UnprocessableEntity, message, 422)
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string = 'Resource not found') {
    super(StatusCode.NotFound, message, 404)
  }
}

export class ForbiddenError extends HttpError {
  constructor(message: string = 'Forbidden') {
    super(StatusCode.Forbidden, message, 403)
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message: string = 'Unauthorized') {
    super(StatusCode.Unauthorized, message, 401)
  }
}
export class ConflictError extends HttpError {
  constructor(message: string = 'Conflict') {
    super(StatusCode.Conflict, message, 403)
  }
}
