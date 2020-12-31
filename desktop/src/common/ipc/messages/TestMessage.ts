import ProcessMessage, {
  IProcessMessageHeader,
  IProcessResponse
} from './ProcessMessage';
import { Channel } from '../';

export interface ITestMessageParams extends IProcessMessageHeader {
  message: string;
}

export interface ITestMessageResponse extends IProcessResponse {
  message: string;
}

export class TestMessage extends ProcessMessage {
  private message: string;

  public constructor(message: string) {
    super(Channel.TEST);
    this.message = message;
  }

  public getParams(): ITestMessageParams {
    return { ...super.getParams(), message: this.message };
  }
}
