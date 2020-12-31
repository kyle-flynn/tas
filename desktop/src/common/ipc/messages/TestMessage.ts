import ProcessMessage, {
  IProcessMessageHeader,
  IProcessResponse
} from './ProcessMessage';

export interface ITestMessageParams extends IProcessMessageHeader {
  message: string;
}

export interface ITestMessageResponse extends IProcessResponse {
  message: string;
}

export class TestMessage extends ProcessMessage {
  private message: string;

  public constructor(message: string) {
    super('test');
    this.message = message;
  }

  public getConfig(): ITestMessageParams {
    return { ...super.getParams(), message: this.message };
  }
}
