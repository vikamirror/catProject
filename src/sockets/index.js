import io from 'socket.io-client';

export const socket = io.connect('http://localhost:3009');

socket.on('error', (err) => {
    console.error('來自server的socket error:', err);
});