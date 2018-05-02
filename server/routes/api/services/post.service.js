import Post from '../models/post';
import Member from '../models/member';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';
import axios from 'axios';

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
    }
    const newPost = new Post(req.body);
    // sanitizeHtml:避免XSS攻擊
    newPost.title = sanitizeHtml(newPost.title);
    newPost.cover = sanitizeHtml(newPost.cover, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ])
    });
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
                cuid: newPost.cuid
            });
        })
        .catch(err => {
            res.status(500).json({message: `api/services/post createPost錯誤: ${err}`});
            console.log(err);
        });
}

export function getPosts(req, res) {
    Post
        .find({}, {_id:0, __v:0}) // 不需要的欄位
        .sort({lastModify: -1}) // 最近更新文章的排在前面
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
        .findOne({ cuid: req.params.cuid }, {_id:0, __v:0})
        .then((post) => {
            // console.log('server getOnePost:', post);
            res.status(200).json({
                post: post
            });
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
    Post
        .find({"author.cuid": req.params.cuid}, {_id:0, __v:0})
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
        const data = await Member.findOne({"cuid" : cuid}, {"_id": 0, "favoritePosts": 1}).exec();
        let cuidList = [];
        if (data.favoritePosts.length > 0) {
            cuidList = data.favoritePosts
                            .sort((a, b) => {
                                if (a.dateAdded < b.dateAdded) return -1;
                                if (a.dateAdded > b.dateAdded) return 1;
                                return 0;
                            })
                            .map(item => item.postCuid);
        }
        const pipeline = [
            // 找到與陣列中postCuid相符的所有文章
            { "$match": { "cuid": { "$in": cuidList } }},
            // 每個文章都增加一個欄位_order, 以cuidList中, cuid的順序遞增 
            { "$addFields": { "_order" : {"$indexOfArray" : [cuidList, "$cuid"]}}},
            // 排序, 以_order欄位遞增排序
            { "$sort": { "_order": 1 } }
        ];
        Post
            .aggregate(pipeline)
            .then((posts) => {
                // console.log('aggregate posts:', posts);
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