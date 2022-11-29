type LoggerLevel = 'error' | 'warn' | 'info' | 'debug';

export default interface ILogger {
  setLevel(level: LoggerLevel): void;
  setPrefix(prefix: string): void;
  warn(msg: string, ...data: any[]): void;
  error(msg: string, ...data: any[]): void;
  fatal(msg: string, error: Error): void;
  info(msg: string, ...data: any[]): void;
  debug(msg: string, ...data: any[]): void;
}

export type { LoggerLevel };
