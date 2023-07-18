export function sendError(res, statusCode, message) {
  console.error(message);
  res.status(statusCode).send({ message });
}

export function sendResponse(res, statusCode, message, data) {
  res.status(statusCode).send({ message, data });
}
