import { container } from 'tsyringe';

import logger from '../infra/logger';

import ILogger from '../infra/logger/interfaces/logger';

container.registerSingleton<ILogger>('logger', logger);

