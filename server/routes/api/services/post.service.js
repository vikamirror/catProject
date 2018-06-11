import Post from '../models/post';
import Member from '../models/member';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * 會員發新文章
 * 參數:x-www-form-urlencoded:
 * Post.title,
 * Post.cover,
 * Post.charactor,
 * Post.city,
 * Post.district,
 * Post.age,
 * Post.gender,
 * Post.requirements,
 * Post.remark,
 * Post.contact,
 * Post.contactInfo
 * @returns {res.status(200).send({message: '成功訊息'})}
 */
export function createPost(req, res) {
    if (!req.body.title || 
        !req.body.cover ||
        !req.body.charactor ||
        !req.body.city ||
        !req.body.district ||
        !req.body.age ||
        !req.body.gender ||
        !req.body.remark ||
        !req.body.contact ||
        !req.body.contactInfo) {
            res.status(400).json({
                message: '必填欄位為undefined或空值'
            });
        return;
    }
    const newPost = new Post(req.body);
    // sanitizeHtml:避免XSS攻擊
    newPost.title = sanitizeHtml(newPost.title);
    newPost.cover = sanitizeHtml(newPost.cover);
    // newPost.story = sanitizeHtml(newPost.story, {
    //     allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
    // });
    newPost.charactor = sanitizeHtml(newPost.charactor, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
    });
    newPost.city = sanitizeHtml(newPost.city);
    newPost.district = sanitizeHtml(newPost.district);
    newPost.age = sanitizeHtml(newPost.age);
    newPost.gender = sanitizeHtml(newPost.gender);
    newPost.remark = sanitizeHtml(newPost.remark);
    newPost.contact = sanitizeHtml(newPost.contact);
    newPost.contactInfo = sanitizeHtml(newPost.contactInfo);
    // 取代_id的亂數
    newPost.cuid = cuid();
    // console.log('newPost:',newPost);
    newPost
        .save()
        .then(() => {
            res.status(200).json({
                message: '新增成功',
                post: newPost
            });
        })
        .catch(err => {
            res.status(500).json({message: `api/services/post createPost錯誤`});
            console.log(err);
        });
}

export function getPosts(req, res) {
    if (!req.params.pageNum) {
        res.status(400).json({
            message: '缺少param:頁次'
        });
        return;
    }
    let pageNumber =  req.params.pageNum;
    const postsPerPage = 30;
    const conditions = {"isDeleted": false};
    const projection = {_id:0, __v:0}; // 不需要的欄位
    Post
        .find(conditions, projection)
        .sort({lastModify: -1}) // 最近更新文章的排在前面
        .skip( pageNumber > 0 ? ( ( pageNumber - 1 ) * postsPerPage ) : 0 )
        .limit(postsPerPage)
        .then((posts) => {
            // console.log('posts', posts);
            res.status(200).json({
                posts: posts
            });
        })
        .catch(err => {
            res.status(500);
            console.log(err);
        });
}

export function updatePost (req, res) {
    if (!req.body.cuid) {
        res.status(400).json({
            message: '缺少post.cuid'
        });
        return;
    }
    if (!req.body.title || 
        !req.body.cover ||
        !req.body.charactor ||
        !req.body.city ||
        !req.body.district ||
        !req.body.age ||
        !req.body.gender ||
        !req.body.remark ||
        !req.body.contact ||
        !req.body.contactInfo) {
            res.status(400).json({
                message: '必填欄位為undefined或空值'
            });
            return;
    };
    const postForUpdate = {
        "title": req.body.title,
        "cover": req.body.cover,
        // "story": req.body.story,
        "charactor": req.body.charactor,
        "city": req.body.city,
        "district": req.body.district,
        "age": req.body.age,
        "gender": req.body.gender,
        "requirements": req.body.requirements,
        "remark": req.body.remark,
        "contact": req.body.contact,
        "contactInfo": req.body.contactInfo,
        "lastModify": Date.now()
    };
    Post
        .findOneAndUpdate(
            {"cuid": req.body.cuid}, 
            {$set: postForUpdate},
            {new: true, _id: false, __v: false}, // 這樣才會回傳update後的
        )
        .then((updatedPost) => {
            res.status(200).json({
                post: updatedPost,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: 'updatePost失敗'
            });
            console.log(`updatePost失敗,原因:"${err}`);
        });
}

/**
 * 取得一個post的資料
 * parameter: post.cuid
 */
export function getOnePost(req, res) {
    if (!req.params.cuid) {
        res.status(400).json({
            message: '無附帶cuid'
        });
        return;
    }
    Post
        .findOne({
            "cuid": req.params.cuid,
            "isDeleted": false,
        }, {_id:0, __v:0})
        .then((post) => {
            if (!post) {
                res.status(200).json({
                    result: 0,
                    message: '此文章已被刪除'
                });
                return;
            } else {
                res.status(200).json({
                    post: post
                });
            }
        })
        .catch(err => {
            res.status(500);
            console.log(err);
        });
}

/**
 * 取得一個會員發表過的所有文章
 * parameter: member.cuid
 */
export function getPostsByAuthor (req, res) {
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    const conditions = {
        "author.cuid": cuid,
        "isDeleted": false,
    };
    const projection = {_id:0, __v:0};
    Post
        .find(conditions, projection)
        .sort({"dateAdded": -1})
        .then((posts) => {
            res.status(200).json({
                posts: posts
            });
        })
        .catch(err => {
            res.status(500);
            console.log(err);
        });
}

export async function getFavoritePosts (req, res) {
    const cuid = sanitizeHtml(JSON.parse(req.headers.authorization).cuid);
    try {
        // const memberAggrePipeline = [
        //     { $match: {"cuid" : cuid} }, // 先找到該會員
        //     { $project: {"_id": 0, "favoritePosts": 1} }, // 只需要"favoritePosts"這個欄位
        //     { $unwind: "$favoritePosts" }, // 將favoritePosts展開成能排序的documents, 欄位名稱一定要加$字號
        //     { $sort: {'favoritePosts.dateAdded': -1} }, // 依照日期遞減排序, 最新的日期在前面
        // ];
        const conditions = {"cuid" : cuid};
        const projection = {"_id": 0, "favoritePosts": 1};
        const data = await Member.findOne(conditions, projection).exec();
        let cuidList = [];
        if (data.favoritePosts.length > 0) {
            cuidList = data.favoritePosts.reverse().map(item => item.postCuid);
                            // .sort((a, b) => {
                            //     if (a.dateAdded < b.dateAdded) return -1;
                            //     if (a.dateAdded > b.dateAdded) return 1;
                            //     return 0;
                            // })
                            // .map(item => item.postCuid);
        };
        const pipeline = [
            // 找到與陣列中postCuid相符的所有文章
            { "$match": { "cuid": { "$in": cuidList }, "isDeleted": false }},
            // 每個文章都增加一個欄位_order, 以cuidList中, cuid的順序遞增 
            { "$addFields": { "_order" : {"$indexOfArray" : [cuidList, "$cuid"]}}},
            // 排序, 以_order欄位遞增排序
            { "$sort": { "_order": 1 } }
        ];
        Post
            .aggregate(pipeline)
            .then((posts) => {
                res.status(200).json({
                    posts: posts
                });
            })
            .catch(err => {
                res.status(500).json({message: 'server getFavoritePosts Error'});
                console.error('server/post.service/getFavoritePosts/aggregate, Error:', err)
            });
    } catch (err) {
        res.status(500).json({message: 'server getFavoritePosts Error'});
        console.error('server/post.service/getFavoritePosts/await Error:', err);
    }
}

/**
 * 刪除一個Post
 * parameter: post.cuid
 */
export function deletePost (req, res) {
    if (!req.params.cuid) {
        res.status(400).json({message: '無Post.cuid'});
        return;
    }
    Post
        .updateOne(
            {"cuid": req.params.cuid}, 
            {$set: {"isDeleted": true}}
        )
        .then(() => {
            res.status(200).json({message: '刪除成功'});
        })
        .catch(err => {
            res.status(500).json({message: 'server deletePost Error'});
            console.error('server/post.service/deletePost Error:', err);
        });
}