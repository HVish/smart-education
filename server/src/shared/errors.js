const { StatusCodes } = require('http-status-codes');

const API_ERROR = Symbol('api_error');

function isApiError(err) {
  if (!err || typeof err !== 'object') return false;
  return Boolean(API_ERROR in err && err[API_ERROR]);
}

class ValidationError extends Error {
  [API_ERROR] = true;
  status = StatusCodes.BAD_REQUEST;
}

/** Useful when we don't know the identity of the user */
class UnauthenticatedError extends Error {
  [API_ERROR] = true;
  status = StatusCodes.UNAUTHORIZED;
}

/**
 * Useful when we know the identity of the user but
 * user is not allowed to perform some action
 */
class UnauthorizedError extends Error {
  [API_ERROR] = true;
  status = StatusCodes.FORBIDDEN;
}

module.exports = {
  isApiError,
  ValidationError,
  UnauthenticatedError,
  UnauthorizedError,
};
