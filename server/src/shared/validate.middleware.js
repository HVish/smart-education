const z = require('zod');
const { fromZodError } = require('zod-validation-error');

const { ValidationError } = require('./errors');

function validate({ params, query, body }) {
  return (req, res, next) => {
    try {
      if (params) {
        req.params = params.parse(req.params);
      }
      if (query) {
        req.query = query.parse(req.query);
      }
      if (body) {
        req.body = body.parse(req.body);
      }
      next();
    } catch (error) {
      const parsedError = fromZodError(error);
      next(new ValidationError(parsedError.message));
    }
  };
}

module.exports = { validate };
