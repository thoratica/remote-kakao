import { createConnection, NetConnectOpts, Socket } from 'net';

export class Networker {
  constructor(options: NetConnectOpts, callback?: () => void) {
    this.socket = createConnection(options, callback);
    this.socket.on('error', console.error);
  }
  public send(text: string) {
    return this.socket.write(text + '\n');
  }
  public socket: Socket;
}
