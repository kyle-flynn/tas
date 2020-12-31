import ProcessMessage, {
  IProcessMessageHeader,
  IProcessResponse
} from './ProcessMessage';
import { Channels } from '../';

export interface ITestMessageBody extends IProcessMessageHeader {
  message: string;
}

export interface ITestMessageResponse extends IProcessResponse {
  message: string;
}

export class TestMessage extends ProcessMessage {
  private message: string;

  public constructor(message: string) {
    super(Channels.TEST);
    this.message = message;
  }

  public getBody(): ITestMessageBody {
    return { ...super.getBody(), message: this.message };
  }
}
