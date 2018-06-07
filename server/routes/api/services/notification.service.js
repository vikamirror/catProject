import sanitizeHtml from 'sanitize-html';
import cuid from 'cuid';

import Notification from '../models/notification';

// client端新增一個notification
export function postNotification (req, res) {
    if (!req.body.messageTo ||
        !req.body.messageFrom ||
        !req.body.message) {
        res.status(400).json({
            message: '缺少必要欄位'
        });
        return;
    }
    const notificationItem = {
        cuid: cuid(),
        messageFrom: req.body.messageFrom,
        message: sanitizeHtml(req.body.message),
        link: req.body.link
    }
    const query = {"memberCuid": req.body.messageTo};
    const update = {$push: {"notifications": notificationItem}};
    const options = {
        upsert: true, // insert or update
        new: true, // 這樣才會回傳update後的
        fields: "notifications", // 只要這些欄位, 其他不要
    };

    Notification.findOneAndUpdate(query, update, options, (error, result) => {
        if (error) {
            console.error('notification.service.js/postNotification/findOneAndUpdate error:', error);
            return;
        }
        if (!result) {
            // 如果該會員尚無notification, 新增
            result = new Notification();
        }
        // 若會員已有notification, 則update
        result
            .save()
            .then((updatedResult) => {
                // console.log('updatedResult:', updatedResult);
                const latestNotify = updatedResult.notifications[updatedResult.notifications.length - 1]; 
                // console.log('latestNotify:', latestNotify);
                // 回傳需有dateAdded及cuid
                if (latestNotify) {
                    res.status(200).json({
                        notification: latestNotify
                    });
                }
            })
            .catch(err => {
                console.error('notification.service.js/postNotification/findOneAndUpdate/save err:', err);
            });
    });
};

export function getNotifications (req, res) {
    const memberCuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const query = {"memberCuid": memberCuid};
    const projection = "notifications";
    Notification.findOne(query, projection, (error, result) => {
        if (error) {
            console.error('notification.service.js/getNotifications/findOne error:', error);
            res.status(500).json({
                message: 'getNotifications server端錯誤'
            });
            return;
        }
        if (!result) {
            // 該會員尚無notification
            res.status(200).json({
                notifications: [],
            });
            return;
        }
        const notifications = result.notifications.reverse(); // 依照新增順序遞減
        res.status(200).json({
            notifications: notifications,
        });
    });
};
