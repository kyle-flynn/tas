import { app, BrowserWindow, ipcMain } from 'electron';
import debug from 'electron-debug';
import ProcessChannel, {
  MessageCallback
} from '../common/ipc/routes/ProcessRoute';
import TestRoute from '../common/ipc/routes/TestRoute';

const lock: boolean = app.requestSingleInstanceLock();
let win: BrowserWindow;

debug();

function createWindow() {
  win = new BrowserWindow({
    height: 720,
    width: 1280,
    webPreferences: {
      nodeIntegration: true
    },
    resizable: true,
    title: 'TAS - Desktop'
  });

  // Initialize ipc channels.
  initIpc([new TestRoute()]);

  win.show();
  win.loadURL('http://localhost:9090/');
  win.webContents.openDevTools();
  win.setMenu(null);

  win.on('closed', () => {
    // @ts-ignore - Dereference window memory.
    win = null;
  });
}

function initIpc(channels: ProcessChannel[]) {
  channels.forEach((channel: ProcessChannel) =>
    channel
      .getChannels()
      .forEach((fn: MessageCallback<any>, channelName: string) => {
        ipcMain.on(channelName, (event, request) => fn(event, request));
      })
  );
}

if (!lock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) {
        win.restore();
      }
    }
    win.focus();
  });
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
