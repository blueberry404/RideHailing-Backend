import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import { queues } from './queues';
import Processor from './processor';
import { typeOrmConfig } from '../config';
import { client } from '../redisClient';

(async () => {

  dotenv.config();

  try {
    const conn = await createConnection(typeOrmConfig);

    process.on('exit', async () => {
      await conn.close();
      console.log('Worker:::: PG connection closed in queue manager');
    });

    const processor: Processor = new Processor(client);

    Object.entries(queues).forEach(([queueName, queue]) => {
      console.log(`Worker listening to '${queueName}' queue`);
      queue.process(processor.findDriver);
    });

  }
  catch (ex) {
    console.error(ex);
  }
})();
