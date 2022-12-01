import logLevel from 'loglevel';
import { injectable } from 'tsyringe';

import ILogger from '../interfaces/logger';
@injectable()
class LogLevel implements ILogger {
  private prefix: string;

  private logger: logLevel.RootLogger;

  constructor() {
    this.logger = logLevel;
    this.prefix = '[LEMON]';
  }

  setLevel(level: 'error' | 'warn' | 'info' | 'debug'): void {
    this.logger.setDefaultLevel(level);
  }

  setPrefix(prefix: string): void {
    this.prefix = prefix;
  }

  info(msg: string, ...data: any[]): void {
    this.logger.info(this.prefix, msg, data);
  }

  debug(msg: string, ...data: any[]): void {
    this.logger.debug(this.prefix, msg, data);
  }

  error(msg: string, ...data: any[]): void {
    this.logger.error(this.prefix, msg, data);
  }

  fatal(msg: string, error: Error): void {
    this.logger.error(this.prefix, msg, error);
  }

  warn(msg: string, ...data: any[]): void {
    this.logger.warn(this.prefix, msg, data);
  }
}

export default LogLevel;
