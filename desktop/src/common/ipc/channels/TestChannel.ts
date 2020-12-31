import { IpcMainEvent } from 'electron';
import ProcessChannel from './ProcessChannel';
import { IProcessResponse } from '../messages/ProcessMessage';
import {
  ITestMessageParams,
  ITestMessageResponse
} from '../messages/TestMessage';

export default class TestChannel extends ProcessChannel {
  public constructor() {
    super('test');
  }

  public handle(event: IpcMainEvent, params: ITestMessageParams): void {
    try {
      const response: ITestMessageResponse = { message: params.message };
      event.reply(this.getResponseName(), response);
    } catch (e) {
      const response: IProcessResponse = { error: e };
      event.reply(this.getResponseName(), response);
    }
  }
}
