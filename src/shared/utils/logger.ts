// src/shared/utils/logger.ts
export enum LogLevel { ERROR = 'error', WARN = 'warn', INFO = 'info', DEBUG = 'debug' }

interface LoggerOptions { prefix?: string; timestamp?: boolean; }

const isServer = typeof process !== 'undefined' && (process as any).release?.name === 'node';  // FIX: Cast any para TS

export const logger = {
  log(level: LogLevel, message: string, options: LoggerOptions = {}) {
    const { prefix = '[Southwave-RP]', timestamp = true } = options;
    const time = timestamp ? new Date().toISOString().replace('T', ' ').substr(0, 19) : '';
    const formatted = timestamp ? `[${time}] ${prefix} [${level.toUpperCase()}] ${message}` : `${prefix} [${level.toUpperCase()}] ${message}`;

    if (level === LogLevel.ERROR) console.error(formatted);
    else if (level === LogLevel.WARN) console.warn(formatted);
    else if (level === LogLevel.DEBUG) {
      if (isServer) {
        console.debug?.(formatted);  // FIX: Optional chain, no truthy check
        if (!console.debug) console.log(formatted);  // Fallback si no existe
      } else {
        console.log(`[DEBUG] ${formatted}`);
      }
    } else console.log(formatted);
  },
  error(message: string, options?: LoggerOptions) { this.log(LogLevel.ERROR, message, options); },
  warn(message: string, options?: LoggerOptions) { this.log(LogLevel.WARN, message, options); },
  info(message: string, options?: LoggerOptions) { this.log(LogLevel.INFO, message, options); },
  debug(message: string, options?: LoggerOptions) { this.log(LogLevel.DEBUG, message, options); }
};

export const log = logger.log.bind(logger);