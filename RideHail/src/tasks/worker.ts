import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

import { queues, FIND_NEARBY_DRIVER_URL, NOTIFY_CONSUMER_RIDE_ACCEPTED } from './queues';
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

      switch (queueName) {
        case FIND_NEARBY_DRIVER_URL:
          queue.process(processor.findDriver);
          break;

        case NOTIFY_CONSUMER_RIDE_ACCEPTED:
          queue.process(processor.notifyClientAboutRideAcceptanceByDriver);
          break;
      
        default:
          break;
      }
    });

  }
  catch (ex) {
    console.error(ex);
  }
})();
