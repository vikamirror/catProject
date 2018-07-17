import { saveLogoutTime, getLastLogoutTime } from '../redis/lastLogoutTime';

export default function loginAndOutFactory (socket) {

    // A帳號登入
    const loginHandler = (cuid) => {
        console.log(`會員${cuid}登入`);
        socket.join(cuid);
        socket.member = cuid;
        emitLastLogoutTimeOfMember(socket.member);
    };

    const emitLastLogoutTimeOfMember = async (member) => {
        let lastLogoutTime = await getLastLogoutTime(member);
        console.log(`${member}上次登出時間: ${lastLogoutTime}`);
        socket.emit('lastLogoutTime', lastLogoutTime);
    };

    // 若A帳號登入, 其他裝置的A帳號必須登出
    const logoutAllTheOtherDevicesHandler = (cuid) => {
        socket.broadcast.to(cuid).emit('logout');
    };
    
    // A帳號登出
    const logoutHandler = (cuid) => {
        console.log(`會員${cuid}登出`);
        socket.broadcast.to(cuid).emit('logoutAllTheOtherDevices'); // 其他裝置的A帳號登出
        socket.leave(cuid); // 現有的裝置也登出
        saveLogoutTime(cuid, new Date().toISOString());
        socket.member = null;
    };

    // A帳號斷線
    const disconnectHandler = () => {
        if (socket.member) {
            console.log(`會員${socket.member}斷線`);
            socket.leave(socket.member);
            saveLogoutTime(socket.member, new Date().toISOString());
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