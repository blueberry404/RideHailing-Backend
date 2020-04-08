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

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
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

  parseMessage(msg: any, eventName: string) {
    if(msg) {
      const data = JSON.parse(msg);
      if(data.socketID) {
        const socket = this.io.clients().sockets[data.socketID];
        if(socket) {
          socket.emit(eventName, data.payload);
        }
      }
    }
  }

  subscribeToRedisEvents() {
    RedisManager.messenger.consume(RedisManager.EVENT_RIDE_REQUEST)
    .subscribe(msg => this.parseMessage(msg, RedisManager.EVENT_RIDE_REQUEST));
    RedisManager.messenger.consume(RedisManager.EVENT_NO_DRIVER_FOUND)
    .subscribe(msg => this.parseMessage(msg, RedisManager.EVENT_NO_DRIVER_FOUND));
    RedisManager.messenger.consume(RedisManager.EVENT_DRIVER_ACCEPTED_RIDE)
    .subscribe(msg => this.parseMessage(msg, RedisManager.EVENT_DRIVER_ACCEPTED_RIDE));
  }
}

interface ISocketConnectEvent {
  userID: number;
  type: String;
}

export default Sockets;