export const Protocol = {
  HTTP: 'http',
  HTTPS: 'https'
};

export const HttpStatus = {
  Unknown: 0,
  Ok: 200,
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  UnsupportedMediaType: 415,
  InternalServerError: 500,
  ServiceUnavailable: 503
};

export const HttpMethod = {
  GET: 'get',
  POST: 'post',
  PUT: 'put',
  DELETE: 'delete'
};
