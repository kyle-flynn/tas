/**
 * This interface defines the properties and methods that a message
 * class should include.
 */
export interface IProcessMessage {
  getChannel(): string;
  getSequence(): number;
  getBody(): any;
  setSequence(sequence: number): void;
}

/**
 * This interface defines properties that should be
 * included with every message that is sent to the main process.
 */
export interface IProcessMessageHeader {
  sequence: number;
  responseChannel: string;
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

  /**
   * Returns the channel name of the message.
   * @returns {string} - Channel name as string.
   */
  public getChannel(): string {
    return this.channel;
  }

  /**
   * Returns the message sequence number.
   * @returns {number} - Sequence number.
   */
  public getSequence(): number {
    return this.sequence;
  }

  /**
   * Returns the entire header, and body of the message.
   * @returns {T extends IProcessMessageHeader} - A type that extends IProcessMessageHeader.
   */
  public getBody(): IProcessMessageHeader {
    return {
      sequence: this.getSequence(),
      responseChannel: `${this.getChannel()}-response`
    };
  }

  /**
   * Sets the sequence number of the message.
   * @param {number} sequence
   */
  public setSequence(sequence: number): void {
    this.sequence = sequence;
  }
}
