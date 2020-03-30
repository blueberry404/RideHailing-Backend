import SocketIO from 'socket.io';
import Redis, { RedisAdapter } from 'socket.io-redis';
import { setAsync, getRedisConfig } from './redisClient';

class Sockets {
  private io: SocketIO.Server;
  private port: number;

  constructor(srv: any | undefined = undefined, port: number) {
    this.port = port;
    if (srv) {
      this.io = SocketIO(srv);
    }
    else {
      this.io = SocketIO(port);
    }
    const adapter: RedisAdapter = Redis(getRedisConfig());
    this.io.adapter(adapter);
  }

  listenToSocket() {
    this.io.on('connection', (socket: any) => {

      console.log('Connected client on port %s.', this.port);

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
    await setAsync(`${connectEvent.userID}-${connectEvent.type}`, JSON.stringify(payload));
  }

  sendNotification(socketID: string, eventName: string, payload: any) {
    const socket = this.io.sockets.sockets[socketID];
    if(socket) {
      socket.emit(eventName, payload);
    }
    else {
      console.log("socket not found :(");
    }
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
  type: String;
}

interface ISocketAcceptRide {
  consumerId: number;
  rideId: number;
  driverId: number;
}

export default Sockets;