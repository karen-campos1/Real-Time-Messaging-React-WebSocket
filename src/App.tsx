import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { io } from "socket.io-client";
import MessageInput from "./components/MessageInput";
import ChatBody from "./components/ChatBody";
import "./App.css";  // Import custom CSS

const socket = io("http://127.0.0.1:5000", { autoConnect: false });

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [username, setUsername] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleConnect = () => {
    socket.connect();
    setIsConnected(true);
  };

  const handleDisconnect = () => {
    socket.disconnect();
    setIsConnected(false);
  };

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      setIsLoggedIn(true);
      handleConnect();
    }
  };

  return (
    <Container className="app-container">
      {isLoggedIn ? (
        <>
          <p className="status">
            CONNECTION STATUS:{" "}
            {isConnected ? "Connected to Flask Server" : "Disconnected from Flask Server"}
          </p>
          {isConnected ? (
            <>
              <ChatBody socket={socket} username={username} />
              <MessageInput socket={socket} username={username} />
              <Button variant="danger" onClick={handleDisconnect}>Disconnect</Button>
            </>
          ) : (
            <Button onClick={handleConnect}>Connect</Button>
          )}
        </>
      ) : (
        <Form onSubmit={handleLogin} className="login-form">
          <Form.Group>
            <Form.Label>Enter Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Login</Button>
        </Form>
      )}
    </Container>
  );
}

export default App;
