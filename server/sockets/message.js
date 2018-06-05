// import { redisPublish } from '../redis/publish'; 
import { saveMessage, getUnsentNotifies, deleteNotifiesHasBeenSent } from '../redis/message';

export default function messageFactory (socket, io) {
    // 收到一則新的message, 包括tag對象, 留言內容
    const postMessageNotifyHandler = (newMessage) => {
        // 如果該會員在線上
        if (!newMessage.fromMember.cuid ||
            !newMessage.fromMember.name ||
            !newMessage.fromMember.avatar ||
            !newMessage.toMember.cuid ||
            !newMessage.toMember.name ||
            !newMessage.content) {
            return;
        }
        const toWhom = newMessage.toMember.cuid;
        // redisPublish(toWhom, newMessage);
        const isMemberOnline = io.sockets.adapter.rooms[toWhom];
        if (isMemberOnline) {
            socket.broadcast.to(toWhom).emit('receivedNewPostMessage', newMessage);
        } else {
            saveMessage(toWhom, newMessage);
        }
    };

    // 是否有未收的message通知
    const unsentNotifiesHandler = async () => {
        const unsentList = await getUnsentNotifies(socket.member);
        // console.log('unsentList.length', unsentList.length);
        if (unsentList.length > 0) {
            unsentList.forEach(((item, index, array) => {
                // console.log('socket.member', socket.member);
                // console.log('item', item);
                socket.emit('receivedNewPostMessage', JSON.parse(item)); // 發給自己
            }));
        }
        deleteNotifiesHasBeenSent(socket.member);
    }

    return {
        postMessageNotifyHandler,
        unsentNotifiesHandler,
    };
}