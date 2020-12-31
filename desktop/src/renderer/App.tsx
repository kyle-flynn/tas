import React, { useEffect, useState } from 'react';
import {
  ITestMessageResponse,
  TestMessage
} from '../common/ipc/messages/TestMessage';
import IpcManager from './managers/IpcManager';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function sendTest() {
      const response: ITestMessageResponse = await IpcManager.sendOnce(
        new TestMessage('testing')
      );
      setMessage(response.message);
    }
    sendTest();
  }, []);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default App;
