import App from './app';

const port = process.env.PORT || '8080';
const app = new App(+port); //or parseInt(port);
app.listen();
      /*
    npm run typeorm migration:run
    
    For parameter:
    npm run typeorm migration:generate -- -n migrationNameHere
    */
