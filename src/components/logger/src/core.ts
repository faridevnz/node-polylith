const logger = require('pino')();

const log = (message: unknown) => logger.info(String(message));

export { log }