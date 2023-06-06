import React, { useEffect, useRef, useState } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');
  const socket = useRef<WebSocket | null>(null);

  // useEffect(() => {
  //   const wsUrl = `ws://${window.location.hostname}:8080`;

  //   socket.current = new WebSocket(wsUrl);
  //   socket.current.onmessage = (event) => {
  //     if(typeof event.data === "string") {
  //       setReceivedMessage(event.data);
  //     } else {
  //       const reader = new FileReader();
  //       reader.onload = function() {
  //         if(reader.result) {
  //           setReceivedMessage(reader.result.toString());
  //         }
  //       }
  //       reader.readAsText(event.data);
  //     }
  //   };

  //   return () => {
  //     socket.current?.close();
  //   };
  // }, []);

  useEffect(() => {
    socket.current = new WebSocket(`ws://${window.location.hostname}:8080`);
    socket.current.onmessage = (event) => {
      if(typeof event.data === "string") {
        setReceivedMessage(event.data);
      } else {
        // Convert Blob to string
        const reader = new FileReader();
        reader.onload = function() {
          if(reader.result) {
            setReceivedMessage(reader.result.toString());
          }
        }
        reader.readAsText(event.data);
      }
    };

    return () => {
      socket.current?.close();
    };
  }, []);

  // useEffect(() => {
  //   socket.current = new WebSocket('ws://localhost:8080');
  //   socket.current.onmessage = (event) => setReceivedMessage(event.data);

  //   return () => {
  //     socket.current?.close();
  //   };
  // }, []);

  const sendMessage = () => {
    if (socket.current) {
      socket.current.send(message);
      setMessage('');
    }
  };

  return (
    <div className="App">
      <input type="text" value={message} onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
      <p>Received Message: {receivedMessage}</p>
    </div>
  );
};

export default App;