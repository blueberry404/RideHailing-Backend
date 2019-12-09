import 'reflect-metadata';

import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import App from './app';

dotenv.config();
const port = process.env.PORT || '8080';
const app = new App(+port); //or parseInt(port);

import { typeOrmConfig } from './config';

(async () => {
  const conn = await createConnection(typeOrmConfig);
  console.log('PG connected.');
  
  app.listen();

  await conn.close();
  console.log('PG connection closed.');
})();

      /*
    npm run typeorm migration:run
    
    For parameter:
    npm run typeorm migration:generate -- -n migrationNameHere
    */
