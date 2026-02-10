import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool as PgPool } from 'pg';
//import { Pool as NeonPool } from '@neondatabase/serverless';      npm install @neondatabase/serverless

export const dockerParams = {
  host: "localhost",
  port: 5432,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
}

/*const neonDBParams = {
  connectionString: process.env.NEON_CONNECTION_STRING,
};*/

export const db = drizzle(/*process.env.NODE_ENV === "production" ? new NeonPool(neonDBParams) :*/ new PgPool(dockerParams));

/*
  Em arquiteturas tradicionais, você configura e mantém servidores:
  - Compra ou aluga máquinas (físicas ou virtuais).
  - Instala o sistema operacional, configura rede, atualiza segurança, etc.
  - Implanta sua aplicação nesse servidor e garante que ele fique online 24/7.

  Serverless muda isso: Você não gerencia o servidor.

  - Apenas escreve funções ou endpoints (chamadas “functions as a service” ou FaaS).
  - O provedor cloud (Vercel, AWS Lambda, etc.) eh quem provisiona o servidor temporariamente. Executa sua função quando necessário. Destrói ou coloca em “sleep” quando não há requisições.

  Pool clássico: mantém conexões abertas e espera reutilizar essas conexões, assume processo vivo. Modelo incompatível com Serveless.

  Serverless: cada endpoint API é executado em uma função serverless isolada, ou seja, uma requisição chega e uma instância da função serverless “acorda”. Quando a requisição termina, aquela instância pode ser destruída imediatamente ou permanecer “quente” por algum tempo (para atender novas requisições rapidamente).
*/