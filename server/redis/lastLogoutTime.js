import { mainClient } from './index';

// 保存使用者上一次登出/斷線的時間
export const saveLogoutTime = (member, logoutTime) => {
    if (typeof member !== "string" || typeof logoutTime !== "string") {
        console.error('redis saveLogoutTime, member or logoutTime is not a String');
        return;
    }
    mainClient.SET(`${member}logoutAt`, logoutTime);
};

// 取出使用者上一次登出/斷線的時間
export const getLastLogoutTime = (member) => {
    return new Promise((resolve, reject) => {
        mainClient.GET(`${member}logoutAt`, (error, reply) => {
            if (error) { reject(error) };
            if (reply) {
                resolve(reply);
            };
        });
    });
};