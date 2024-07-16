import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

interface ChatProps {
  username: string;
}

const Chat: React.FC<ChatProps> = ({ username }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on('message', (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    const msg = `${username}: ${message}`;
    socket.send(msg);
    setMessage('');
  };

  return (
    <div className="chat">
      <div className="messages">
        {messages.map((msg, index) => {
          const isUserMessage = msg.startsWith(`${username}:`);
          return (
            <div
              key={index}
              className={`message ${isUserMessage ? 'user-message' : 'other-message'}`}
            >
              {msg}
            </div>
          );
        })}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
