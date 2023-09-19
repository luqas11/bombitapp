module.exports = (req, res, next) => {
  switch (req.path) {
    case '/clear-history':
      const historyDevice = Number(req.query.device);
      if (
        isNaN(historyDevice) ||
        (historyDevice !== 0 && historyDevice !== 1)
      ) {
        res.status(400).jsonp({
          error_code: 'ERR_02',
          error_message: 'Invalid device number',
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
    case '/resume':
      const resumeDevice = Number(req.query.device);
      if (isNaN(resumeDevice) || (resumeDevice !== 0 && resumeDevice !== 1)) {
        res.status(400).jsonp({
          error_code: 'ERR_02',
          error_message: 'Invalid device number',
        });
        return;
      }
      break;
  }
  return next();
};
