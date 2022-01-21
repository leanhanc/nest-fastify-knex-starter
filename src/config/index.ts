import GeneralConfig from './general';
import DatabaseConfig, { commonKnexConfig } from './database';

export type EnvironmentVariables = ReturnType<typeof DatabaseConfig> &
  ReturnType<typeof GeneralConfig>;

export { GeneralConfig, DatabaseConfig, commonKnexConfig };
