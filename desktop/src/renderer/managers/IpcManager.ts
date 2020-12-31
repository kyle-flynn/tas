import { IpcRenderer, IpcRendererEvent } from 'electron';
import { IProcessMessage, IProcessResponse } from '../../common/ipc';

class IpcManager {
  private static instance: IpcManager;

  private ipcRenderer!: IpcRenderer;
  private sequence: number;

  public static getInstance(): IpcManager {
    if (typeof IpcManager.instance === 'undefined') {
      IpcManager.instance = new IpcManager();
    }
    return IpcManager.instance;
  }

  private constructor() {
    this.sequence = 0;
  }

  private init(): void {
    if (!window || !window.process || !window.require) {
      throw new Error('Unable to require ipc renderer.');
    }
    this.ipcRenderer = window.require('electron').ipcRenderer;
  }

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
        message.setSequence(this.sequence);
        this.ipcRenderer.send(message.getChannel(), message.getParams());
        this.sequence++;
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default IpcManager.getInstance();
