import Message from '../models/message';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * 會員在一篇文章底下留言
 * 參數:x-www-form-urlencoded:
 * Message.postCuid,
 * Message.member,
 * Message.tag,
 * Message.message,
 * @returns {res.status(200).send({message: '成功訊息'})}
 */
export function postMessage (req, res) {
    if (!req.body.postCuid ||
        !req.body.member.cuid ||
        !req.body.member.name ||
        !req.body.member.avatar ||
        !req.body.tag.name ||
        !req.body.tag.memberCuid ||
        !req.body.message) {
        res.status(400).json({
            message: 'client端有一必須欄位為undefined或空值'
        });
        return;
    }
    const newMessage = new Message(req.body);
    newMessage.message = sanitizeHtml(newMessage.message);
    // 取代_id的亂數
    newMessage.cuid = cuid();
    // console.log('newMessage:',newMessage);
    newMessage
        .save()
        .then(() => {
            res.status(200).json({
                message: '新增message成功',
                newMessage: {
                    cuid: newMessage.cuid,
                    dateAdded: newMessage.dateAdded,
                    member: newMessage.member,
                    message: newMessage.message,
                    postCuid: newMessage.postCuid,
                    tag: newMessage.tag,
                }
            });
        })
        .catch(err => {
            res.status(500).json({message: 'api/services/message postMessage錯誤'});
            console.log(err);
        });
}

export function getMessages (req, res) {
    Message
        .find({"postCuid": req.params.postCuid}, {"_id": 0, "__v": 0})
        .sort({"dateAdded": 1}) // 預設最舊的的排在前面
        .then((messages) => {
            res.status(200).json({
                messages: messages
            });
        })
        .catch(err => {
            res.status(500);
            console.log(err);
        });
}