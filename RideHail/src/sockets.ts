import SocketIO from 'socket.io';
import { setAsync } from './redisClient';

class Sockets {
    private io: SocketIO.Server;
    private port: number;

    constructor(srv: any, port: number) {
        this.port = port;
        this.io = SocketIO(srv);
    }

    listenToSocket() {
        this.io.on('connection', (socket: any) => {

            console.log('Connected client on port %s.', this.port);
      
            socket.on('available', (connectEvent: ISocketConnectEvent) => {
              console.log('Client available');
              console.log(`Client available:::: ${JSON.stringify(connectEvent)}`);
              socket.emit('ServerMessage', { message: "Hello World with Sockets and Love!" });
            });
      
            socket.on('connect', async (connectEvent: ISocketConnectEvent) => {
              console.log(`Client connect:::: ${JSON.stringify(connectEvent)}`);
              //save socket info on redis for later use
              const payload = {
                  userID: connectEvent.userID,
                  socketID: socket.id
              };
              console.log(`Payload on connect with ID... ${JSON.stringify(payload)}`);
              await setAsync(connectEvent.userID.toString(), JSON.stringify(payload));
            });
      
            socket.on('disconnect', () => {
              console.log('Client disconnected');
            });
          });
    }
}

interface ISocketConnectEvent {
    userID: number;
}


interface ISocketTest {
    name: string;
    email: string;
  }

export default Sockets;