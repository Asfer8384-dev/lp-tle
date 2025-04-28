export const RESPONSE_STATUS = {
  OK: 200,
  ERROR: 400,
  DUPLICATE_EMAIL: 3001,
  DUPLICATE_PHONE: 3002,
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
};

export const RESPONSE_MESSAGE = {
  OK: "OK",
  ERROR: "ERROR",
  DUPLICATE_ENTRY: "DUPLICATE_ENTRY",
  UNAUTHORIZED: "UNAUTHORIZED",
};

export const API_ERRORCODE = {
  SERVER_ERROR: 101,
  EXTERNAL_RESOURCE_ERROR: 301,
};

export const Response = function Response(statusCode, message, result) {
  this.status = statusCode;
  this.message = message;
  this.result = result;
};
