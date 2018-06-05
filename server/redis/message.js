import { mainClient } from './index';

export const saveMessage = (member, message) => {
    mainClient.RPUSH(`msgFor${member}`, JSON.stringify(message));
};

export const getUnsentNotifies = (member) => {
    return new Promise((resolve, reject) => {
        mainClient.LRANGE(`msgFor${member}`, 0, -1, (err, reply) => {
            resolve(reply);
        });
    });
};

export const deleteNotifiesHasBeenSent = (member) => {
    mainClient.DEL(`msgFor${member}`);
};