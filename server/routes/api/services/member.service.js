import Member from '../models/member';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import crypto from 'crypto'; // nodejs內建
import jwt from 'jsonwebtoken';

import sendMail from '../middlewares/sendEmail';

/**
 * 取得會員資訊
 * 參數:無
 * @returns res.status(200).send({會員token, 會員資料, res.status, 成功訊息})
 */
export function getMember(req, res) {
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    if (cuid) {
        Member
            .find({cuid: cuid}, {
                _id: 0, //只有_id預設是“顯示”的, 因此只有_id要設為0
                name: 1,
                avatar: 1,
                favoritePosts: 1,
                cuid: 1})
            .then(data => {
                if (data[0]) {
                    res.status(200).json({
                        validToken: true,
                        member: data[0]
                    });
                } else {
                    res.status(400).json({
                        validToken: false
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: 'api/services/getMember server錯誤'
                });
                console.error(`api/services/getMember server錯誤: ${err}`);
            });
    }
}

/**
 * 會員註冊
 * @param {email, password, name}
 * @returns res.status(200).send({會員token, 會員資料, res.status, 成功訊息})
 */
export function register(req, res) {
    if (req.body.email === '' || req.body.password === '' || req.body.name === '') {
        res.status(401).end('Oops,有資料未填寫完整喔');
        return;
    }
    Member
        .find({ email: req.body.email })
        .then((members) => {
            if (members[0] !== undefined) {
                // console.log('emailExisted error');
                throw new Error({ name: 'emailExisted', message: '此信箱已被註冊' });
            }
        })
        .then(() => {
            const newMember = new Member(req.body);
            // 避免XSS攻擊
            newMember.email = sanitizeHtml(newMember.email);
            newMember.password = crypto.createHash('md5').update(sanitizeHtml(newMember.password)).digest('hex');
            newMember.name = sanitizeHtml(newMember.name);
            newMember.avatar = `http://www.gravatar.com/avatar/${crypto.createHash('md5').update(newMember.email).digest('hex')}?s=120&d=identicon`;
            // 取代_id的亂數
            newMember.cuid = cuid();
            newMember
                    .save()
                    .then(() => {
                        sendMail({ email: newMember.email });
                        /**
                         * jwt token
                         */
                        const jwtpayload = { cuid: newMember.cuid };
                        const jwtToken = jwt.sign({
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 保存1天
                                data: {
                                    member: jwtpayload,
                                },
                        }, process.env.JWT_SECRET);
                        res.status(200).json({
                            memberToken: jwtToken,
                            member: {
                                cuid: newMember.cuid,
                                name: newMember.name,
                                avatar: newMember.avatar,
                                favoritePosts: newMember.favoritePosts,
                            },
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            message: 'api/services/register member新增錯誤'}
                        );
                        console.error(`api/services/register member新增錯誤: ${err}`);
                    });
        })
        .catch((err) => {
            if (err.name === 'emailExisted') {
                res.status(401).json({
                    message: "此信箱已被註冊"
                });
            }
            res.status(500).json({
                message: 'api/services/register server錯誤'
            });
            console.log(`api/services/register server錯誤: ${err}`);
        });
}

/**
 * FB註冊/登入
 * 參數:x-www-form-urlencoded: 
 * accessToken,
 * fb.name,
 * fb.id,
 * fb.email(若有的話)
 * fb.picture
 * 後端也要先驗證是否有該accessToken存在,才能進行下一步
 * 先檢查他的FB id是否已被註冊成user.account
 * @param {facebookID, name, email, avatar, accessToken}
 */
export function loginWithFacebook(req, res) {
    Member
        .find({facebookID: req.body.facebookID})
        .then((data) => { // 先檢查他的FB id是否已被註冊成user.account
            if (data[0] === undefined) { // 若此FB id尚未註冊, 新增一個會員
                const newMember = new Member(req.body);
                // 避免XSS攻擊
                newMember.facebookID = sanitizeHtml(newMember.facebookID);
                newMember.name = sanitizeHtml(newMember.name);
                let shouldFillEmail;
                if (sanitizeHtml(newMember.email)) {
                    newMember.email = sanitizeHtml(newMember.email);
                    shouldFillEmail = false;
                } else {
                    shouldFillEmail = true;
                }
                if (sanitizeHtml(newMember.avatar)) {
                    newMember.avatar = `http://graph.facebook.com/${newMember.facebookID}/picture?type=small`;
                }
                // 取代_id的亂數
                newMember.cuid = cuid();
                // console.log('newMember', newMember);
                newMember.save()
                         .then(() => {
                            /**
                             * jwt token
                             */
                            const jwtpayload = { cuid: newMember.cuid };
                            const jwtToken = jwt.sign({
                                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 保存1天
                                    data: {
                                        member: jwtpayload,
                                    },
                            }, process.env.JWT_SECRET);
                            res.status(200).json({
                                memberToken: jwtToken,
                                member: {
                                    cuid: newMember.cuid,
                                    name: newMember.name,
                                    avatar: newMember.avatar,
                                    favoritePosts: newMember.favoritePosts,
                                },
                                shouldFillEmail: shouldFillEmail // 是否提醒會員填寫email
                            });
                         })
                         .catch((err) => {
                            console.log('api loginWithFacebook member新增錯誤:', err);
                            res.status(500).json({
                                message: `api loginWithFacebook member新增錯誤: ${err}`
                            });
                         })
            } else {
                // 若此FB id已被註冊, 直接登入
                
                // 若會員尚未填寫信箱, 提醒會員填寫
                let shouldFillEmail = data[0].email === "undefined" ? true : false;
                console.log('shouldFillEmail: ', shouldFillEmail);
                /**
                 * jwt token
                 */
                const jwtpayload = { cuid: data[0].cuid };
                const jwtToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 保存一天
                    data: {
                        user: jwtpayload
                    }
                }, process.env.JWT_SECRET);
                res.status(200).json({
                    memberToken: jwtToken,
                    member: {
                        cuid: data[0].cuid,
                        name: data[0].name,
                        avatar: data[0].avatar,
                        favoritePosts: data[0].favoritePosts,
                    },
                    shouldFillEmail: shouldFillEmail
                });
            };
        })
        .catch(err => {
            console.error('service loginWithFacebook err:', err);
        });
}

/**
 * 登入
 * 參數:x-www-form-urlencoded:
 * @param {email, password}
 */
export function login(req, res) {
    Member
        .find({ email: req.body.email })
        .then((data) => {
            if(data[0] === undefined) {
                res.status(401).end('Oops,該信箱不存在');
                return;
            }
            const md5  = crypto.createHash('md5');
            if(data[0].password === md5.update(req.body.password).digest('hex')) {
                /**
                 * jwt token
                 */
                const jwtpayload = { cuid: data[0].cuid };
                const jwtToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 保存一天
                    data: {
                        user: jwtpayload
                    }
                }, process.env.JWT_SECRET);
                res.status(200).json({
                    memberToken: jwtToken,
                    member: {
                        cuid: data[0].cuid,
                        name: data[0].name,
                        avatar: data[0].avatar,
                        favoritePosts: data[0].favoritePosts,
                    },
                });
            } else {
                res.status(400).json({
                    message: 'Oops,密碼不正確'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                message: 'api/services/login server錯誤'
            });
            console.error(`api/services/login server錯誤: ${err}`);
        });
};

/**
 * 會員新增一個我的最愛Post
 * 參數:x-www-form-urlencoded:
 * @param {postCuid}
 */
export function addFavoritePost (req, res) {
    if (!req.body.postCuid) {
        res.status(400).json({message: 'postCuid為空值或undefined'});
        return;
    }
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const postCuid = sanitizeHtml(req.body.postCuid);
    const query = {"cuid": cuid};
    const options = {$push: {"favoritePosts": {"postCuid": postCuid} }};
    Member
        .update(query, options)
        .then(() => res.status(200).json({message: '收藏成功'}))
        .catch((err) => {
            res.status(500).json({
                message: 'api/services/addFavoritePost server錯誤'
            });
            console.error('api/services/addFavoritePost server錯誤:', err);
        });
}

/**
 * 會員移除一個我的最愛Post
 * 參數:x-www-form-urlencoded:
 * @param {postCuid}
 */
export function removeFavoritePost (req, res) {
    if (!req.params.postCuid) {
        res.status(400).json({message: 'postCuid為空值或undefined'});
        return;
    }
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const query = {"cuid": cuid};
    const options = {$pull: {"favoritePosts": {"postCuid": req.params.postCuid} }};
    Member
        .update(query, options)
        .then(() => res.status(200).json({message: '已從收藏中刪除'}))
        .catch((err) => {
            res.status(500).json({
                message: 'api/services/removeFavoritePost server錯誤'
            });
            console.error('api/services/removeFavoritePost server錯誤:', err);
        });
}





