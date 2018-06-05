import socket from './index';

// 新增其他client的PostList
export const addPostListBroadcastEmitter = (newPost) => {
    socket.emit('addPostListBroadcast', newPost);
};

// 收到有會員新增post的廣播
export const addPostListBroadcastListener = (addPostListBroadcastHandler) => {
    socket.on('addPostListBroadcast', (newPost) => {
        addPostListBroadcastHandler(newPost);
    });
};

// update其他client的PostList
export const updatePostListBroadcastEmitter = (updatedPost) => {
    socket.emit('updatePostListBroadcast', updatedPost);
};

// 收到有會員修改post的廣播
export const updatePostListBroadcastListener = (updatePostListBroadcastHandler) => {
    socket.on('updatePostListBroadcast', (updatedPost) => {
        updatePostListBroadcastHandler(updatedPost);
    });
};

// 刪除一篇文章, 更新其他client的PostList
export const deletePostListBroadcastEmitter = (postCuid) => {
    socket.emit('deletePostListBroadcast', postCuid);
};

// 收到有會員刪除post的廣播
export const deletePostListBroadcastListener = (deletePostListBroadcastHandler) => {
    socket.on('deletePostListBroadcast', (postCuid) => {
        deletePostListBroadcastHandler(postCuid);
    });
}