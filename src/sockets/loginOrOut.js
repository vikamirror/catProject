import { socket } from './index';

// 通知其他裝置的同一個帳號登出
export const logoutAllTheOtherDevicesEmitter = (memberCuid) => {
    socket.emit('logoutAllTheOtherDevices', memberCuid);
};

// 收到該帳號要登出的廣播
export const logoutAllTheOtherDevicesListener = (logoutAllTheOtherDevicesHandler) => {
    socket.on('logoutAllTheOtherDevices', () => {
        logoutAllTheOtherDevicesHandler();
    });
}

// 會員登入的通知
export const loginEmitter = (memberCuid) => {
    socket.emit('login', memberCuid);
}

// 會員登出的通知
export const logoutEmitter = (memberCuid) => {
    socket.emit('logout', memberCuid);
}