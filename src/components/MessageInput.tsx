import React, { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";
import "./MessageInput.css";  // Import custom CSS

interface SocketProps {
  socket: Socket;
  username: string;
}

const MessageInput = ({ socket, username }: SocketProps) => {
  const [message, setMessage] = useState<string>("");

  const handleSendMessage = (event: FormEvent) => {
    event.preventDefault();
    if (message.trim()) {
      socket.emit("message", { text: message, username });
      setMessage("");
    }
  };

  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  return (
    <Container className="message-input">
      <Form onSubmit={handleSendMessage}>
        <Form.Group>
          <Form.Control
            type="text"
            value={message}
            autoComplete="off"
            placeholder="Type your message..."
            onChange={(event) => setMessage(event.target.value)}
            onKeyDown={handleEnterKey}
          />
        </Form.Group>
        <Button type="submit">Send</Button>
      </Form>
    </Container>
  );
};

export default MessageInput;
