import Message from '../models/message';
import Member from '../models/member';
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
export async function postMessage (req, res) {
    if (!req.body.postCuid ||
        // !req.body.member.cuid ||
        // !req.body.member.name ||
        // !req.body.member.avatar ||
        // !req.body.tag.name ||
        !req.body.taggedMember ||
        !req.body.message) {
        res.status(400).json({
            message: 'client端有一必須欄位為undefined或空值'
        });
        return;
    }
    const msgFrom_cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const msgFrom = await Member.findOne({"cuid": msgFrom_cuid}).exec();
    const msgFrom_id = msgFrom._id;

    const receiver_cuid = sanitizeHtml(req.body.taggedMember);
    const receiver = await Member.findOne({"cuid": receiver_cuid}).exec();
    const receiver_id = receiver._id;

    const message = {
        cuid: cuid(),
        postCuid: sanitizeHtml(req.body.postCuid),
        member: msgFrom_id,
        tag: receiver_id,
        message: sanitizeHtml(req.body.message),
    };
    const newMessage = new Message(message);
    newMessage.save((err) => {
        if (err) {
            res.status(500).json({message: '新增留言, 伺服器錯誤'});
            console.error(err);
            return;
        }
        res.status(200).json({
            message: '新增留言成功',
            newMessage: {
                cuid: newMessage.cuid,
                postCuid: newMessage.postCuid,
                member: {
                    cuid: msgFrom.cuid,
                    name: msgFrom.name,
                    avatar: msgFrom.avatar,
                },
                tag: {
                    cuid: receiver.cuid,
                    name: receiver.name,
                },
                message: newMessage.message,
                dateAdded: newMessage.dateAdded,
            }
        });
    });
};

export function getMessages (req, res) {
    const conditions = {"postCuid": req.params.postCuid};
    const projection = {"_id": 0, "__v": 0};
    Message
        .find(conditions, projection)
        .populate([
            {path: "member", select: "cuid name avatar -_id"}, // 剔除_id
            {path: "tag", select: "cuid name -_id"}
        ])
        .sort({"dateAdded": 1}) // 預設最舊的的排在前面
        .exec((err, messages) => {
            if (err) {
                res.status(500);
                console.error('api/services/getMessages 錯誤', err);
                return;
            }
            res.status(200).json({
                messages: messages
            });
        });
};