import express from 'express';
import bodyParser from 'body-parser';
import url from 'url';
import Arena from 'bull-arena';
import * as http from 'http';
import SocketIO from 'socket.io';

import * as users from './controllers/users';
import * as auth from './controllers/auth';
import errorMiddleware from './middlewares/error';

import { FIND_NEARBY_DRIVER_URL } from './tasks/queues';

class App {
  public app: express.Application;
  public port: number;
  private server: http.Server;
  private io: SocketIO.Server;

  constructor(port: number) {
    this.app = express();
    this.port = port;
    this.server = http.createServer(this.app);
    this.io = SocketIO(this.server);

    //Express configuration
    this.initializaMiddleWares();
    this.registerRoutes();
    this.handleErrors();
  }

  private initializaMiddleWares() {
    this.app.set("port", this.port);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use('/', Arena(
      {
        queues: [
          {
            name: FIND_NEARBY_DRIVER_URL,
            hostId: 'Worker',
            redis: this.getRedisConfig(process.env.REDIS_URL as string)
          }
        ]
      },
      {
        basePath: '/arena',
        disableListen: true
      }
    ));
  }

  private registerRoutes() {
    this.app.post('/login', auth.login);
    this.app.get('/users/consumers', users.getAllConsumers);
    this.app.get('/users/drivers', users.getAllDrivers);
    this.app.post('/users/consumer/create', users.createConsumer);
    this.app.post('/users/driver/create', users.createDriver);
    this.app.post('/users/driver/updateStatus', users.changeDriverStatus);
    this.app.post('/users/driver/updateLocation', users.updateDriverLocation);
    this.app.post('/bookRide', users.bookRide);
    this.app.post('/cancelRide', users.cancelRide);
  }

  private handleErrors() {
    this.app.use(errorMiddleware);
  }

  private getRedisConfig(redisUrl: string) {
    const redisConfig = url.parse(redisUrl);
    return {
      host: redisConfig.hostname || 'localhost',
      port: Number(redisConfig.port || 6379),
      database: (redisConfig.pathname || '/0').substr(1) || '0',
      password: redisConfig.auth ? redisConfig.auth.split(':')[1] : undefined
    };
  }

  public listen() {
    // server listening on our defined port
    this.listenToServer();

    //socket events
    this.listenToSocket();
  }

  private listenToSocket() {
    this.io.on('connect', (socket: any) => {

      console.log('Connected client on port %s.', this.port);

      socket.on('available', (test: ISocketTest) => {
        console.log('Client available');
        console.log(`Message received is:::: ${JSON.stringify(test)}`);
        socket.emit('ServerMessage', { message: "Hello World with Sockets and Love!" });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  private listenToServer() {
    this.server.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
    
}

interface ISocketTest {
  name: string;
  email: string;
}

export default App;