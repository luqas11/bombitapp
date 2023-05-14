module.exports = (req, res, next) => {
  switch (req.path) {
    case '/clear-history':
      const input = Number(req.query.input);
      if (isNaN(input) || (input !== 0 && input !== 1)) {
        res.status(400).jsonp({
          error_code: 'ERR_02',
          error_message: 'Invalid input number',
        });
        return;
      }
      break;
    case '/change-time-limit':
      const timeLimit = Number(req.query.time_limit);
      if (isNaN(timeLimit) || timeLimit <= 0) {
        res.status(400).jsonp({
          error_code: 'ERR_01',
          error_message: 'Invalid time value',
        });
        return;
      }
      break;
    case '/resume-output':
      const output = Number(req.query.output);
      if (isNaN(output) || (output !== 0 && output !== 1)) {
        res.status(400).jsonp({
          error_code: 'ERR_04',
          error_message: 'Invalid output number',
        });
        return;
      }
      break;
  }
  return next();
};
