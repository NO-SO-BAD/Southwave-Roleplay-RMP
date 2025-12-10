// src/shared/utils/logger.ts
// Logger compartido y seguro para server (Node.js) y client (RAGE MP)

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

interface LoggerOptions {
  prefix?: string;
  timestamp?: boolean;
}

const isServer = typeof process !== 'undefined' && process.release?.name === 'node';

export const logger = {
  log(level: LogLevel, message: string, options: LoggerOptions = {}) {
    const { prefix = '[Southwave-RP]', timestamp = true } = options;
    const time = timestamp ? new Date().toISOString().replace('T', ' ').substr(0, 19) : '';
    const formatted = timestamp 
      ? `[${time}] ${prefix} [${level.toUpperCase()}] ${message}`
      : `${prefix} [${level.toUpperCase()}] ${message}`;

    // En client no existe console.debug, usamos log
    if (level === LogLevel.ERROR) {
      console.error(formatted);
    } else if (level === LogLevel.WARN) {
      console.warn(formatted);
    } else if (level === LogLevel.DEBUG) {
      // Solo debug en server o si está activado manualmente
      if (isServer) {
        console.debug(formatted);
      } else {
        console.log(`[DEBUG] ${formatted}`);
      }
    } else {
      console.log(formatted);
    }
  },

  error(message: string, options?: LoggerOptions) {
    this.log(LogLevel.ERROR, message, options);
  },

  warn(message: string, options?: LoggerOptions) {
    this.log(LogLevel.WARN, message, options);
  },

  info(message: string, options?: LoggerOptions) {
    this.log(LogLevel.INFO, message, options);
  },

  debug(message: string, options?: LoggerOptions) {
    this.log(LogLevel.DEBUG, message, options);
  }
};

// Alias rápido
export const log = logger.log;