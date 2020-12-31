import { IpcMainEvent } from 'electron';
import { IProcessMessageHeader } from '../messages/ProcessMessage';

export default abstract class ProcessChannel {
  private name: string;

  public constructor(name: string) {
    this.name = name;
  }

  public getName(): string {
    return this.name;
  }

  public getResponseName(): string {
    return `${this.name}-response`;
  }

  public abstract handle(
    event: IpcMainEvent,
    params: IProcessMessageHeader
  ): void;
}
