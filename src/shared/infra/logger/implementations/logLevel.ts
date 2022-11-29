import logLevel from 'loglevel';
import { inject, injectable } from 'tsyringe';

import ILogger from '@shared/infra/logger/interfaces/logger';
import ISentry from '@shared/infra/sentry/interfaces';

@injectable()
class LogLevel implements ILogger {
  private prefix: string;

  private logger: logLevel.RootLogger;

  constructor(
    @inject('sentry')
    private sentry: ISentry
  ) {
    this.logger = logLevel;
    this.prefix = '[ELEMENTAL-PROXY]';
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
    this.sentry.log('error', msg, data);
  }

  fatal(msg: string, error: Error): void {
    this.logger.error(this.prefix, msg, error);
    this.sentry.fatal(error);
  }

  warn(msg: string, ...data: any[]): void {
    this.logger.warn(this.prefix, msg, data);
  }
}

export default LogLevel;
