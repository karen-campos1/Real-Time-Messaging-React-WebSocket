import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { Socket } from "socket.io-client";
import "./ChatBody.css";  // Import custom CSS

interface SocketProps {
  socket: Socket;
  username: string;
}

interface Message {
  text: string;
  username: string;
}

const ChatBody = ({ socket, username }: SocketProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("message", (emittedMessage: Message) => {
      setMessages((prevMessages) => [...prevMessages, emittedMessage]);
    });
  }, [socket]);

  return (
    <Container className="chat-body">
      {messages.map((message, index) => (
        <Card key={index} className={`message-card ${message.username === username ? "sent" : "received"}`}>
          <Card.Body>
            <strong>{message.username}:</strong> {message.text}
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default ChatBody;
