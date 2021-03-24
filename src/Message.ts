import { Networker } from './Networker';

(JSON as any).isValid = (text: string, keys: Array<string>) => {
  try {
    JSON.parse(text);
    return true;
  } catch (_) {
    return false;
  }
};

export class ReceivedMessage {
  constructor(data: { [key: string]: any }) {
    this.room = data.room;
    this.content = data.content;
    this.isGroupChat = data.isGroupChat;
    this.packageName = data.packageName;
  }
  room: string;
  content: string;
  isGroupChat: boolean;
  packageName: string;
}

export class Message extends ReceivedMessage {
  constructor(data: { [key: string]: any }, net: Networker) {
    super(data);
    this.net = net;
  }
  public net: Networker;
  public reply = async (content): Promise<boolean> =>
    await this.replyRoom(this.room, content);
  public replyRoom = async (
    room: string,
    content: string
  ): Promise<boolean> => {
    return new Promise((res, rej) => {
      this.net.send(
        JSON.stringify({
          event: 'send',
          data: { room, content },
        })
      );
      this.net.socket.once('data', async (data) => {
        if (JSON.parse(data.toString()).event === 'sent') {
          res(JSON.parse(data.toString()).result);
        }
      });
      setTimeout(rej, 10000);
    });
  };
  public canReply: (room: string) => Promise<boolean>;
  public profileImage: () => Promise<string>;
  public raw: {
    [key: string]: any;
  };
}
