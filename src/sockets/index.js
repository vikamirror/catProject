import io from 'socket.io-client';

const socket = io('http://localhost:3009');

// Connection failed
socket.on('error', (err) => {
    console.error('來自server的socket error:', err);
});

export default socket;