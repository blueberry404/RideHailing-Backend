import { queues } from './queues';
import processorInitializers from './processor';

Object.entries(queues).forEach(([queueName, queue]) => {
    console.log(`Worker listening to '${queueName}' queue`);
    queue.process(processorInitializers[queueName]);
  });