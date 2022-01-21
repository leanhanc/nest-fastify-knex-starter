export const commonKnexConfig = {
  client: 'pg',
  migrations: {
    directory: 'src/db/migrations',
  },
  seeds: {
    directory: 'src/db/seeds',
  },
  pool: {
    min: 2,
    max: 10,
  },
};

export default () => ({
  db: {
    connection: process.env.DATABASE_URL || '',
    debug: process.env.NODE_ENV === 'development',
  },
});
