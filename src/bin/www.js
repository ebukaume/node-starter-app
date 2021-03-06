import configureContainer from '../container';

const {
  config, logger, db, app,
} = configureContainer().cradle;

const hostname = config.hostname || '127.0.0.1';
const port = config.port || 8000;

db.on('connected', () => {
  logger.info('Connected to database successfully');
  app.listen(port, () => {
    logger.info(`API is listening on ${hostname}:${port}`);
  });
});

db.on('disconnected', () => {
  logger.warn('Lost connection to database');
});

db.on('error', (err) => {
  logger.error(`Database error: ${err.message}`);
});

process.on('SIGINT', () => {
  db.close();
  logger.info('Shutting down server...');
  logger.info('Server successfully shutdown');
  process.exit(0);
});
