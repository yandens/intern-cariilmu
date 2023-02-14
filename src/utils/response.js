const response = (res, status, success, message, data) => {
  const result = {};
  result.status = status;
  result.message = message;
  result.success = success;
  result.message = message;
  result.data = data;

  return res.status(result.status).json(result);
};

module.exports = response;
