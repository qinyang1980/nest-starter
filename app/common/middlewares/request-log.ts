import logger from '../utils/logger';

const requestLog = (req, res, next) => {
  const t = new Date();
  logger.info(`Started ${t.toISOString()} ${req.method} ${req.url} ${req.ip}`);

  res.on('finish', () => {
    const n = new Date();
    const duration = n.getTime() - t.getTime();

    logger.info(`Completed ${res.statusCode} (${duration}ms)\n\n`);
  });

  next();
};

export { requestLog };
