const apiKey = '1234';

module.exports = (req, res, next) => {
  const providedApiKey = req.headers['api-key'];
  if (!providedApiKey || providedApiKey !== apiKey) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};
