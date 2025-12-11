export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  DEBUG = "DEBUG",
}

export class Logger {
  private prefix: string;

  constructor(prefix: string = "APP") {
    this.prefix = prefix;
  }

  info(...args: any[]) {
    console.log(`[${LogLevel.INFO}] [${this.prefix}]`, ...args);
  }

  warn(...args: any[]) {
    console.warn(`[${LogLevel.WARN}] [${this.prefix}]`, ...args);
  }

  error(...args: any[]) {
    console.error(`[${LogLevel.ERROR}] [${this.prefix}]`, ...args);
  }

  debug(...args: any[]) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[${LogLevel.DEBUG}] [${this.prefix}]`, ...args);
    }
  }
}

export const logger = new Logger("Shared");
