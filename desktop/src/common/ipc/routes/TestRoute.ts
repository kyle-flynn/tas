import { IpcMainEvent } from 'electron';
import ProcessRoute from './ProcessRoute';
import { IProcessResponse } from '../messages/ProcessMessage';
import {
  ITestMessageBody,
  ITestMessageResponse
} from '../messages/TestMessage';
import { Channels } from '..';

export default class TestRoute extends ProcessRoute {
  public constructor() {
    super();
    this.register(Channels.TEST, this.handleTest);
  }

  public handleTest(event: IpcMainEvent, params: ITestMessageBody): void {
    try {
      const response: ITestMessageResponse = { message: params.message };
      event.reply(params.responseChannel, response);
    } catch (e) {
      const response: IProcessResponse = { error: e };
      event.reply(params.responseChannel, response);
    }
  }
}
