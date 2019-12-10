import 'reflect-metadata';

import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import App from './app';

dotenv.config();
const port = process.env.NODE_PORT || '8080';
const app = new App(+port); //or parseInt(port);

import { typeOrmConfig } from './config';

(async () => {
  try {
    console.error(typeOrmConfig);
    const conn = await createConnection(typeOrmConfig);
    console.log('PG connected.');
    
    app.listen();
  
    process.on('exit', async () => {
      await conn.close();
      console.log('PG connection closed.');
    });
  
  }
  catch(ex) {
    console.error(ex);
  }
})();

      /*
    npm run typeorm migration:run
    
    For parameter:
    npm run typeorm migration:generate -- -n migrationNameHere
    */
