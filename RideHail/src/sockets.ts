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
              console.log(`Client available:::: ${JSON.stringify(connectEvent)}`);
              socket.emit('ServerMessage', { message: "Hello World with Sockets and Love!" });
            });
      
            socket.on('connect', async (connectEvent: ISocketConnectEvent) => {
              console.log(`Client connect:::: ${JSON.stringify(connectEvent)}`);
              //save socket info on redis for later use
              await this.onUserConnect(connectEvent, socket);
            });

            socket.on('rideAccepted', async (payload: ISocketAcceptRide) => {
              console.log(`Payload on rideAccepted... ${JSON.stringify(payload)}`);
              this.onRideAcceptByDriver(payload);
            });
      
            socket.on('disconnect', () => {
              console.log('Client disconnected');
            });
          });
    }

  private async onUserConnect(connectEvent: ISocketConnectEvent, socket: any) {
    const payload = {
      userID: connectEvent.userID,
      socketID: socket.id
    };
    console.log(`Payload on connect with ID... ${JSON.stringify(payload)}`);
    await setAsync(connectEvent.userID.toString(), JSON.stringify(payload));
  }

    onRideAcceptByDriver(payload: ISocketAcceptRide) {
      
    }

    notifyDriverRideAlreadyBooked() {

    }

    notifyConsumerAboutRideAccepted() {
      
    }
    
}

interface ISocketConnectEvent {
    userID: number;
}

interface ISocketAcceptRide {
    consumerId: number;
    rideId: number;
    driverId: number;
  }

export default Sockets;