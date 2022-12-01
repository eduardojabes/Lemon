import 'reflect-metadata';
import 'dotenv/config';
import '../shared/providers';
import { container } from 'tsyringe';

import ILogger, { LoggerLevel } from '@shared/infra/logger/interfaces/logger';


export async function startup(dbConnect = true, brokerConnect = false, cacherConnect = false) {
  const logger = container.resolve<ILogger>('logger');
  logger.setLevel(<LoggerLevel>process.env.LOG_LEVEL ?? 'debug');
}
