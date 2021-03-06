import express from 'express';
import * as PostService from '../services/post.service';
import authToken from '../middlewares/authToken';

const router = express.Router();

router.use((req, res, next) => {
    // Website you wish to allow to connect
    res.header('Access-Control-Allow-Origin', process.env.DOMAIN);
   // Request methods you wish to allow
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   // Request headers you wish to allow
   res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   next();
});

// 會員更新自己的一篇文章
router.put('/post', authToken, PostService.updatePost);

// 會員發新文章
router.post('/post', authToken, PostService.createPost);

// 取得所有文章
router.post('/posts', PostService.getPosts);

// 搜尋文章
router.post('/search', PostService.searchPosts);

// 由post.cuid取得一篇文章
router.get('/post/:cuid', PostService.getOnePost);

// 取得一個member的所有文章
router.get('/myPosts', authToken, PostService.getPostsByAuthor);

// 取得該會員喜歡的所有文章
router.get('/favoritePosts', authToken, PostService.getFavoritePosts);

// 會員自己刪除一篇文章
router.delete('/post/:cuid', authToken, PostService.deletePost);

export default router;



