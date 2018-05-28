export default function loginAndOutFactory (socket) {
    
    // A帳號登入
    const loginHandler = (cuid) => {
        console.log(`會員${cuid}登入`);
        socket.join(cuid);
    }

    // 若A帳號登入, 其他裝置的A帳號必須登出
    const logoutAllTheOtherDevicesHandler = (cuid) => {
        socket.broadcast.to(cuid).emit('logoutAllTheOtherDevices');
    }

    return {
        logoutAllTheOtherDevicesHandler,
        loginHandler,
    };
};