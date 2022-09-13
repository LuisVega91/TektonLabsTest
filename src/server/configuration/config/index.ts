import { registerAs } from '@nestjs/config';

import { getServerConfig } from './server-config';
import { getDatabaseConfig } from './database-config';
import { getTypeOrmConfig } from './type-orm-config';

export default registerAs('config', () => ({
  ...getServerConfig(),
  ...getDatabaseConfig(),
  ...getTypeOrmConfig(),
}));
