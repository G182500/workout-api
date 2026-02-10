import { defineConfig } from 'drizzle-kit';
import { dockerParams } from 'src/db/pool-conection';

const { host, port, user, password, database } = dockerParams;

export default defineConfig({
  out: './src/db/drizzle',
  schema: './src/db/schema',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NODE_ENV === "production" ? process.env.NEON_CONNECTION_STRING!
      : `postgres://${user}:${password}@${host}:${port}/${database}`,
  },
});