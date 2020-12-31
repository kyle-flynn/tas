import { IpcRenderer, IpcRendererEvent } from 'electron';
import {
  IProcessMessage,
  IProcessResponse
} from '../../common/ipc/messages/ProcessMessage';

class IpcManager {
  private static instance: IpcManager;

  private ipcRenderer!: IpcRenderer;

  public static getInstance(): IpcManager {
    if (typeof IpcManager.instance === 'undefined') {
      IpcManager.instance = new IpcManager();
    }
    return IpcManager.instance;
  }

  private IpcManager() {}

  private init(): void {
    if (!window || !window.process || !window.require) {
      throw new Error('Unable to require ipc renderer.');
    }
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

  // const testResponse: TestResponse = await ipcManager.sendOnce(new TestMessage());
  public sendOnce<T extends IProcessMessage, K extends IProcessResponse>(
    message: T
  ): Promise<K> {
    return new Promise<K>((resolve, reject) => {
      try {
        if (!this.ipcRenderer) {
          this.init();
        }

        this.ipcRenderer.once(
          `${message.getChannel()}-response`,
          (event: IpcRendererEvent, response: K) => {
            resolve(response);
          }
        );

        this.ipcRenderer.send(message.getChannel(), message.getConfig());
      } catch (e) {
        // TOOD - Decide how to properly handle errors.
        reject(e);
      }
    });
  }
}

export default IpcManager.getInstance();
