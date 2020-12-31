/**
 * This interface defines the properties and methods that a message
 * class should include.
 */
export interface IProcessMessage {
  getChannel(): string;
  getSequence(): number;
  getParams(): any;
  setSequence(sequence: number): void;
}

/**
 * This interface defines properties that should be
 * included with every message that is sent to the main process.
 */
export interface IProcessMessageHeader {
  sequence: number;
}

/**
 * This interface defines properties that should be
 * included with every response that is sent to the renderer process.
 */
export interface IProcessResponse {
  error?: any;
}

/**
 * Abstract class that takes care of a lot of the boilerplate logic.
 * Example implementation can be seen in the TestMessage/TestChannel class.
 */
export default abstract class ProcessMessage implements IProcessMessage {
  private channel: string;
  private sequence: number;

  public constructor(channel: string) {
    this.channel = channel;
    this.sequence = -1;
  }

  public getChannel(): string {
    return this.channel;
  }

  public getSequence(): number {
    return this.sequence;
  }

  public getParams(): IProcessMessageHeader {
    return {
      sequence: this.getSequence()
    };
  }

  public setSequence(sequence: number): void {
    this.sequence = sequence;
  }
}
