import express from 'express';
import bodyParser from 'body-parser';
import * as users from './controllers/users';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    //Express configuration
    this.initializaMiddleWares();
    this.registerRoutes();
  }

  private initializaMiddleWares() {
    this.app.set("port", this.port);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private registerRoutes() {
    this.app.get('/users', users.getAll);
    this.app.get('/users/bookRide', users.bookRide);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}

export default App;