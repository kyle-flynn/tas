import { IpcMainEvent } from 'electron';
import { IProcessMessageHeader } from '../messages/ProcessMessage';

/**
 * Type definition for message callbacks using the IpcMainEvent and a type
 * that extends IProcessMessageHeader.
 */
export type MessageCallback<T extends IProcessMessageHeader> = (
  event: IpcMainEvent,
  params: T
) => void;

/**
 * Abstract class that defines a template for process routes.
 * Process routes handle all traffic relating to a subject.
 * A process route can handle multiple subjects and channels if related.
 */
export default abstract class ProcessRoute {
  private channelRegistry: Map<string, MessageCallback<any>>;

  public constructor() {
    this.channelRegistry = new Map();
  }

  /**
   * Returns the map of channels registered to the process route.
   * @returns {Map<string, MessageCallback<any>} - Registered channel and its callback.
   */
  public getChannels(): Map<string, MessageCallback<any>> {
    return this.channelRegistry;
  }

  /**
   * Registers a channel to the process route.
   * @param {string} channel - A channel name to register.
   * @param {MessageCallback<any>} fn - A MessageCallback with type T extending IProcessMessageHeader.
   */
  public register(channel: string, fn: MessageCallback<any>): void {
    this.channelRegistry.set(channel, fn);
  }
}
