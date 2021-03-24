import EventEmitter from 'events';
import { NetConnectOpts, Socket } from 'net';
import { Message } from './Message';
import { Networker } from './Networker';

export declare interface Client {
  on(event: 'connect', listener: () => void): this;
  on(event: 'disconnect', listener: () => void): this;
  on(event: 'message', listener: (msg: Message) => void): this;
  on(event: string | symbol, listener: (...args: any[]) => void): this;
  emit(event: 'connect'): boolean;
  emit(event: 'disconnect'): boolean;
  emit(event: 'message', msg: Message): boolean;
  emit(event: string | symbol, ...args: any[]): boolean;
}

export class Client extends EventEmitter {
  public connect(options: NetConnectOpts) {
    this.net = new Networker(options);

    this.net.socket.on('connect', () => this.emit('connect'));

    this.net.socket.on('data', (data) =>
      this.emit('message', new Message(JSON.parse(data.toString()), this.net))
    );

    this.net.socket.on('close', () => this.emit('disconnect'));
  }
  net: Networker;
}
