import io from 'socket.io-client';

// socket.io在(readyState == 1)的時候, 會阻塞buffer
io._original_send_func = io.send;
io.send = function(data) {
   if(this.readyState == 1) this._original_send_func(data);
}.bind(io);

const socket = io(process.env.DOMAIN);

socket.on('connect', () => {
    console.log('client端已連線');
});

// Connection failed
socket.on('disconnect', () => {
    console.log('client端已斷線');
});

export default socket;