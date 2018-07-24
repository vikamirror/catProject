import Member from '../models/member';
import Post from '../models/post';
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
        const conditions = {"cuid": cuid};
        const projection = {
            _id: 0,
            name: 1,
            avatar: 1,
            favoritePosts: 1,
            cuid: 1
        };
        const populateField = 'favoritePosts';
        const selectedFields = "cuid -_id"; // -減號: 剔除_id
        Member
            .find(conditions, projection)
            .populate(populateField, selectedFields)
            .exec((err, member) => {
                if (err) {
                    res.status(500).json({
                        message: '伺服器錯誤'
                    });
                    console.error(`
                        received from: ${cuid},
                        api/services/getMember server錯誤: ${err}
                    `);
                    return;
                };                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
                if (member[0]) {
                    // console.log('member[0]', member[0]);
                    res.status(200).json({
                        validToken: true,
                        member: member[0]
                    });
                };
            });
    }
}

export function getMemberEmail (req, res) {
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const conditions = {"cuid": cuid};
    const projection = {
        "_id": 0,
        "email": 1
    };
    if (cuid) {
        Member
            .findOne(conditions,projection)
            .then(member => {
                if (member.email) {
                    res.status(200).json({
                        email: member.email
                    });
                } else {
                    res.status(200).json({
                        email: ''
                    });
                }
            })
            .catch((err) => {
                res.status(500).json({
                    message: '伺服器錯誤'
                });
                console.error(`
                    received from: ${cuid},
                    api/services/getMember server錯誤: ${err}
                `);
            });
    }
};

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
            };
        })
        .then(() => {
            const newMember = new Member(req.body);
            // 避免XSS攻擊
            newMember.email = sanitizeHtml(newMember.email);
            newMember.password = crypto.createHash('md5').update(sanitizeHtml(newMember.password)).digest('hex');
            newMember.name = sanitizeHtml(newMember.name);
            newMember.avatar = `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(newMember.email).digest('hex')}?s=120&d=identicon`;
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
                            message: '伺服器錯誤'}
                        );
                        console.error(`
                            api/services/register member新增錯誤: ${err},
                            request.body: ${JSON.stringify(req.body)}
                        `);
                    });
        })
        .catch((err) => {
            if (err.name === 'emailExisted') {
                res.status(401).json({
                    message: "此信箱已被註冊"
                });
            }
            res.status(500).json({
                message: '伺服器錯誤'
            });
            console.log(`
                api/services/register server錯誤: ${err},
                request.body: ${JSON.stringify(req.body)}
            `);
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
    if (!req.body.facebookID) {
        res.status(400).json({message: 'facebookID為空值或undefined'});
        return;
    }
    const facebookID = sanitizeHtml(req.body.facebookID);
    const conditions = {"facebookID": facebookID};
    const projection = {
        "_id": 0,
        "name": 1,
        "avatar": 1,
        "cuid": 1,
        "email": 1,
    };
    Member
        .find(conditions, projection)
        .exec((err, members) => {
            if (err) {
                res.status(500).json({
                    message: '伺服器錯誤'
                });
                console.error(`
                    api/member.services/loginWithFacebook server錯誤: ${err},
                    request.body: ${JSON.stringify(req.body)}
                `);
                return;
            }
            if (members[0] === undefined) { // 若此FB id尚未註冊, 新增一個會員
                const newMember = {
                    facebookID: sanitizeHtml(req.body.facebookID),
                    name: sanitizeHtml(req.body.name),
                    cuid: cuid()
                };

                let shouldFillEmail = true;
                if (req.body.email) {
                    newMember.email = sanitizeHtml(req.body.email);
                    shouldFillEmail = false;
                };
                if (sanitizeHtml(req.body.avatar)) {
                    newMember.avatar = `https://graph.facebook.com/${newMember.facebookID}/picture?type=small`;
                };

                const member = new Member(newMember);
                member.save((err) => {
                    if (err) {   
                        res.status(500).json({
                            message: "伺服器錯誤"
                        });
                        console.error(`
                            api/services/member.service/loginWithFacebook member新增錯誤: ${err},
                            request.body: ${JSON.stringify(req.body)}
                        `);
                        return;
                    };
                    /**
                     * jwt token
                     */
                    const jwtpayload = { cuid: member.cuid };
                    const jwtToken = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 保存1天
                        data: {
                            member: jwtpayload,
                        },
                    }, process.env.JWT_SECRET);
                    res.status(200).json({
                        memberToken: jwtToken,
                        member: {
                            cuid: member.cuid,
                            name: member.name,
                            avatar: member.avatar,
                        },
                        shouldFillEmail: shouldFillEmail // 是否提醒會員填寫email
                    });
                });
            } else {
                // 若此FB id已被註冊, 直接登入
                // 若會員尚未填寫信箱, 提醒會員填寫
                let shouldFillEmail = true;
                if (members[0].email) {
                    shouldFillEmail = false;
                };
                // console.log('shouldFillEmail: ', shouldFillEmail);
                /**
                 * jwt token
                 */
                const jwtpayload = { cuid: members[0].cuid };
                const jwtToken = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 保存1天
                    data: {
                        member: jwtpayload,
                    },
                }, process.env.JWT_SECRET);
                res.status(200).json({
                    memberToken: jwtToken,
                    member: {
                        cuid: members[0].cuid,
                        name: members[0].name,
                        avatar: members[0].avatar,
                    },
                    shouldFillEmail: shouldFillEmail // 是否提醒會員填寫email
                });
            }
        });
}

/**
 * 登入
 * 參數:x-www-form-urlencoded:
 * @param {email, password}
 */
export function login(req, res) {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({message: '信箱或密碼為空值或undefined'});
        return;
    }
    const email = sanitizeHtml(req.body.email);
    const conditions = {"email": email};
    const projection = {
        "_id": 0,
        "name": 1,
        "avatar": 1,
        "cuid": 1,
        "password": 1,
    };
    Member
        .find(conditions, projection)
        .exec((err, members) => {
            if (err) {
                res.status(500).json({
                    message: 'api/services/login server錯誤'
                });
                console.error(`api/services/login server錯誤: ${err}`);
                return;
            }
            if (members[0] === undefined) {
                res.status(400).end('Oops,該信箱不存在');
                return;
            }
            const md5  = crypto.createHash('md5');
            const password = sanitizeHtml(req.body.password);
            if (members[0].password !== md5.update(password).digest('hex')) {
                res.status(400).json({
                    message: 'Oops,密碼不正確'
                });
                return;
            }
            /**
             * jwt token
             */
            const jwtpayload = { cuid: members[0].cuid };
            const jwtToken = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24), // 保存一天
                data: {
                    user: jwtpayload
                }
            }, process.env.JWT_SECRET);
            res.status(200).json({
                memberToken: jwtToken,
                member: {
                    cuid: members[0].cuid,
                    name: members[0].name,
                    avatar: members[0].avatar,
                },
            });
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
    };
    const memberCuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const postCuid = sanitizeHtml(req.body.postCuid);
    Post.findOne({"cuid": postCuid}, (err, post) => {
        const conditions = {"cuid": memberCuid};
        const options = {$push: {"favoritePosts": post._id}};
        Member
            .update(conditions, options)
            .then(() => res.status(200).json({message: '收藏成功'}))
            .catch((err) => {
                res.status(500).json({
                    message: '伺服器錯誤'
                });
                console.error(`
                    api/services/addFavoritePost server錯誤: ${err},
                    received from: ${memberCuid},
                    request.body: ${JSON.stringify(req.body)}
                `);
            });
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
    const memberCuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const postCuid = sanitizeHtml(req.params.postCuid);
    Post.findOne({"cuid": postCuid}, (err, post) => {
        const conditions = {"cuid": memberCuid};
        const options = {$pull: {"favoritePosts": post._id}};
        Member
            .update(conditions, options)
            .then(() => res.status(200).json({message: '已從收藏中刪除'}))
            .catch((err) => {
                res.status(500).json({
                    message: '伺服器錯誤'
                });
                console.error(`
                    api/services/removeFavoritePost server錯誤: ${err},
                    received from: ${memberCuid},
                    request.params: ${JSON.stringify(req.params)}
                `);
            });
    });
}

export function updateMember (req, res) {
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const conditions = {"cuid": cuid};
    const updateOptions = {};
    if (req.body.avatar) {
        const avatar = sanitizeHtml(req.body.avatar);
        updateOptions.avatar = avatar;
    }
    if (req.body.name) {
        const name = sanitizeHtml(req.body.name);
        updateOptions.name = name;
    }
    if (req.body.email) {
        const email = sanitizeHtml(req.body.email);
        updateOptions.email = email;
    }
    console.log('updateOptions', updateOptions);
    Member
        .updateOne(conditions, {$set: updateOptions})
        .then(() => {
            res.status(200).json({message: '編輯成功'});
        })
        .catch(err => {
            res.status(500).json({message: '伺服器錯誤'});
            console.error(`
                api/services/member.service/updateMember Error: ${err},
                received from: ${cuid},
                request.body: ${JSON.stringify(req.body)}
            `);
        });
}

export async function updatePassword (req, res) {
    if (!req.body.newPassword || !req.body.oldPassword) {
        res.status(400).json({message: 'newPassword或oldPassword為空值或undefined'});
        return;
    }
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const member = {"cuid": cuid};
    const projection = {
        "_id": 0,
        "password": 1
    };
    const memberData = await Member.findOne(member, projection).exec();
    const currentPassword = memberData.password;
    const md5  = crypto.createHash('md5');

    const oldPassword = md5.update(sanitizeHtml(req.body.oldPassword)).digest('hex');

    if (currentPassword !== oldPassword) {
        res.status(400).json({message: '舊密碼不正確'});
        return;
    } else {
        const newPassword = crypto.createHash('md5').update(sanitizeHtml(req.body.newPassword)).digest('hex');
        Member
            .updateOne(member, {$set: {"password": newPassword}})
            .then(() => {
                res.status(200).json({message: '密碼更新成功'});
            })
            .catch(err => {
                res.status(500).json({message: '伺服器錯誤'});
                console.error(
                    `api/services/member.service/updatePassword Error: ${err},
                    received from: ${cuid},
                    request.body: ${JSON.stringify(req.body)}
                `);
            });
    }
}



