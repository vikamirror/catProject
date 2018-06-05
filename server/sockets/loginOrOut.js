export default function loginAndOutFactory (socket) {

    // A帳號登入
    const loginHandler = (cuid) => {
        console.log(`會員${cuid}登入`);
        socket.join(cuid);
        socket.member = cuid;
    };

    // 若A帳號登入, 其他裝置的A帳號必須登出
    const logoutAllTheOtherDevicesHandler = (cuid) => {
        socket.broadcast.to(cuid).emit('logoutAllTheOtherDevices');
    };
    
    // A帳號登出
    const logoutHandler = (cuid) => {
        console.log(`會員${cuid}登出`);
        socket.broadcast.to(cuid).emit('logoutAllTheOtherDevices'); // 其他裝置的A帳號登出
        socket.leave(cuid); // 現有的裝置也登出
        socket.member = null;
    };

    // A帳號斷線
    const disconnectHandler = () => {
        if (socket.member) {
            console.log(`會員${socket.member}斷線`);
            socket.leave(socket.member);
            socket.member = null;
        }
    };
 
    return {
        logoutAllTheOtherDevicesHandler,
        loginHandler,
        logoutHandler,
        disconnectHandler,
    };
};