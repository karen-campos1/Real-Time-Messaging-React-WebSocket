from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('connect')
def handle_connect():
    print('Client Connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client Disconnected')

@socketio.on('message')
def handle_message(message):
    # print our received message to the server console.  not required, but useful to see that messages are going through the server
    print(f'Received Message: {message}')
    # emit allows us to send the message to all connected clients 
    socketio.emit('message', message)
    
if __name__ == '__main__':
    socketio.run(app)