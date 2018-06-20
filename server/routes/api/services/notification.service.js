import sanitizeHtml from 'sanitize-html';
import cuid from 'cuid';

import Notification from '../models/notification';
import Member from '../models/member';

// client端新增一個notification
export async function postNotification (req, res) {
    if (!req.body.messageTo ||
        !req.body.messageFrom ||
        !req.body.message) {
        res.status(400).json({
            message: '缺少messageTo, messageFrom或message'
        });
        return;
    }
    const messageFrom_cuid = sanitizeHtml(req.body.messageFrom);
    const messageFrom = await Member.findOne({"cuid": messageFrom_cuid}).exec();
    const messageFrom_id = messageFrom._id;

    const notificationItem = {
        cuid: cuid(),
        messageFrom: messageFrom_id,
        message: sanitizeHtml(req.body.message),
    };
    if (req.body.link) {
        notificationItem.link = req.body.link;
    };

    const messageTo = sanitizeHtml(req.body.messageTo);

    const query = {"memberCuid": messageTo};
    const update = {$push: {"notifications": notificationItem}};
    const options = {
        upsert: true, // insert or update
        new: true, // 這樣才會回傳update後的
        fields: "notifications", // 只要這些欄位, 其他不要
    };

    Notification.findOneAndUpdate(query, update, options, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "新增訊息通知, 伺服器錯誤"
            });
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
                        notification: {
                            cuid: latestNotify.cuid,
                            messageFrom: {
                                memberCuid: messageFrom.cuid,
                                name: messageFrom.name,
                                avatar: messageFrom.avatar,
                            },
                            message: latestNotify.message,
                            link: latestNotify.link,
                            dateAdded: latestNotify.dateAdded
                        }
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
    const projection = {"notifications": 1, "_id": 0};

    Notification
        .findOne(query, projection)
        .populate({
            path: "notifications.messageFrom",
            select: "cuid name avatar -_id",
        })
        .exec((err, result) => {
            if (err) {
                res.status(500).json({
                    message: 'getNotifications server端錯誤'
                });
                console.error('notification.service.js/getNotifications/findOne error:', err);
                return;
            }
            // console.log('result', result);
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
