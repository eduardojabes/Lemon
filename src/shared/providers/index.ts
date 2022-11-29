import { container } from 'tsyringe';

import logger from '@shared/infra/logger';

import ILogger from '@shared/infra/logger/interfaces/logger';

container.registerSingleton<ILogger>('logger', logger);

