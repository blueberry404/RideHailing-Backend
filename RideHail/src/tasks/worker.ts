import { createConnection } from 'typeorm';

import { queues } from './queues';
import processorInitializers from './processor';
import { typeOrmConfig } from '../config';

(async () => {

  try {
    const conn = await createConnection(typeOrmConfig);
    console.log('Worker:::: PG connected.');

    process.on('exit', async () => {
      await conn.close();
      console.log('Worker:::: PG connection closed in queue manager');
    });

    Object.entries(queues).forEach(([queueName, queue]) => {
      console.log(`Worker listening to '${queueName}' queue`);
      queue.process(processorInitializers[queueName]);
    });

  }
  catch (ex) {
    console.error(ex);
  }
})();
