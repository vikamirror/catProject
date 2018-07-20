import io from 'socket.io-client';
import { log, errorLog } from '../Utils/console';
// socket.io在(readyState == 1)的時候, 會阻塞buffer
io._original_send_func = io.send;
io.send = function(data) {
   if(this.readyState == 1) this._original_send_func(data);
}.bind(io);

const socket = io(process.env.DOMAIN);

socket.on('connect', () => {
    log('client端已連線');
});

// Connection failed
socket.on('disconnect', () => {
    errorLog('client端已斷線');
});

export default socket;