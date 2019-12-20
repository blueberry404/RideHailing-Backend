import express from 'express';
import bodyParser from 'body-parser';
import * as users from './controllers/users';
import errorMiddleware from './middlewares/error';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    //Express configuration
    this.initializaMiddleWares();
    this.registerRoutes();
    this.handleErrors();
  }

  private initializaMiddleWares() {
    this.app.set("port", this.port);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private registerRoutes() {
    this.app.get('/users/consumers', users.getAllConsumers);
    this.app.get('/users/drivers', users.getAllDrivers);
    this.app.post('/users/consumer/create', users.createConsumer);
    this.app.post('/users/driver/create', users.createDriver);
    this.app.post('/users/driver/updateStatus', users.changeDriverStatus);
    this.app.post('/users/driver/updateLocation', users.updateDriverLocation);
    this.app.get('/users/bookRide', users.bookRide);
  }

  private handleErrors() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;