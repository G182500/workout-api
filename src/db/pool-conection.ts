import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool as PgPool } from 'pg';
//import { Pool as NeonPool } from '@neondatabase/serverless'; npm install @neondatabase/serverless

export const dockerParams = {
  host: 'localhost',
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
};

/*const neonDBParams = {
  connectionString: process.env.NEON_CONNECTION_STRING,
};*/

export const db = drizzle(
  /*process.env.NODE_ENV === "production" ? new NeonPool(neonDBParams) :*/ new PgPool(
    dockerParams,
  ),
);
