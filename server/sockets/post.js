export default function postFactory (socket) {
    // 有會員新增post
    const addPostListBroadcastHandler = (newPost) => {
        socket.broadcast.emit('addPostListBroadcast', newPost);
    }
    // 有會員修改post
    const updatePostListBroadcastHandler = (updatedPost) => {
        socket.broadcast.emit('updatePostListBroadcast', updatedPost);
    }

    // 有會員刪除post
    const deletePostListBroadcastHandler = (postCuid) => {
        socket.broadcast.emit('deletePostListBroadcast', postCuid);
    }
    return {
        addPostListBroadcastHandler,
        updatePostListBroadcastHandler,
        deletePostListBroadcastHandler,
    };
}