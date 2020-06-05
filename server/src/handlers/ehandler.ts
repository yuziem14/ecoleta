export default function (err, request, response, next) {
  if (!err) next();

  if (request.fileValidationError) {
    const { status, message } = request.fileValidationError;

    return response.status(status).json({ err: message });
  }

  return response.status(500).json({ err });
}
