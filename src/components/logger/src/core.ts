// pino manual logger
const pino = require('pino');
const logger = pino({ prettyPrint: { colorize: true } });
// pino logger for express
const pino_http = require('pino-http');
const pino_express = pino_http({ prettyPrint: { colorize: true } }, pino.destination('src/components/logger/resources/router.log'));


/**
 * Log the message of thype info
 * @param message
 * @return void
 */
const info = (message: unknown): void => logger.info(String(message));

/**
 * Get pino-http instance for express
 * @returns pino-http instance
 */
const express = (): any => pino_express;


export {
    // functions
    info,
    express
}