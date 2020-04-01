import SocketIO from 'socket.io';
import * as RedisManager from './redisClient';

class Sockets {
  private io: SocketIO.Server;
  private port: number;

  constructor(srv: any, port: number) {
    this.port = port;
    this.io = SocketIO(srv);
  }

  listenToSocket() {
    this.io.on('connection', (socket: any) => {

      console.log('Connected client', this.port);

      socket.on('connectUser', async (connectEvent: ISocketConnectEvent) => {
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

      socket.on('Ride Request', async (payload: any) => {
        console.log(`:::Test Req SOCKETS received with payload ${JSON.stringify(payload)}`);
      });
    });

    this.io.on('Ride Request', async (payload: any) => {
      console.log(`:::Test Req IO received with payload ${JSON.stringify(payload)}`);
    });
  }

  private async onUserConnect(connectEvent: ISocketConnectEvent, socket: any) {
    const payload = {
      userID: connectEvent.userID,
      type: connectEvent.type,
      socketID: socket.id
    };
    console.log(`Payload on connect with ID... ${JSON.stringify(payload)}`);
    await RedisManager.setAsync(`${connectEvent.userID}-${connectEvent.type}`, JSON.stringify(payload));
  }

  onRideAcceptByDriver(payload: ISocketAcceptRide) {

  }

  notifyDriverRideAlreadyBooked() {

  }

  notifyConsumerAboutRideAccepted() {

  }

  parseMessage(msg: any) {
    if(msg) {
      const data = JSON.parse(msg);
      if(data.socketID) {
        const socket = this.io.clients().sockets[data.socketID];
        if(socket) {
          socket.emit(RedisManager.EVENT_RIDE_REQUEST, data.payload);
        }
      }
    }
  }

  subscribeToRedisEvents() {
    RedisManager.messenger.consume(RedisManager.EVENT_RIDE_REQUEST).subscribe(msg => this.parseMessage(msg));
    RedisManager.messenger.consume(RedisManager.EVENT_NO_DRIVER_FOUND).subscribe(msg => this.parseMessage(msg));
  }
}

interface ISocketConnectEvent {
  userID: number;
  type: String;
}

interface ISocketAcceptRide {
  consumerId: number;
  rideId: number;
  driverId: number;
}

export default Sockets;