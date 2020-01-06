import SocketIO from 'socket.io';

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
      
            socket.on('available', (test: ISocketTest) => {
              console.log('Client available');
              console.log(`Message received is:::: ${JSON.stringify(test)}`);
              socket.emit('ServerMessage', { message: "Hello World with Sockets and Love!" });
            });
      
            socket.on('connect', (test: any) => {
              console.log('Client connect');
              console.log(`Message received is:::: ${JSON.stringify(test)}`);
              socket.emit('ServerMessage', { message: "Hello World with Sockets and Love On Connect!" });
            });
      
            socket.on('disconnect', () => {
              console.log('Client disconnected');
            });
          });
    }
}


interface ISocketTest {
    name: string;
    email: string;
  }

export default Sockets;