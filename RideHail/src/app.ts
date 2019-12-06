import express from 'express';
import bodyParser from 'body-parser';
import * as userRouter from './routes/users';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.initializaMiddleWares();
    this.registerRoutes();
  }

  private initializaMiddleWares() {
    this.app.use(bodyParser.json());
  }

  private registerRoutes() {
    this.app.use('/users', userRouter);
  }
}

//https://github.com/microsoft/TypeScript-Node-Starter