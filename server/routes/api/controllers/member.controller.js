import express from 'express';
import * as MemberService from '../services/member.service';
import authToken from '../middlewares/authToken';
import * as facebookAPI from '../middlewares/facebookAPI';

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

// 取得會員資料
router.get('/getMember', authToken, MemberService.getMember);

// 取得會員email
router.get('/getMemberEmail', authToken, MemberService.getMemberEmail);

// 修改會員資料
router.put('/member', authToken, MemberService.updateMember);

// 修改會員密碼
router.put('/password', authToken, MemberService.updatePassword);

// 會員註冊
router.post('/register', MemberService.register);

// FB註冊or登入
router.post('/loginWithFacebook', facebookAPI.hasAccessToken, MemberService.loginWithFacebook);

// 會員登入
router.post('/login', MemberService.login);

// 會員新增一個我的最愛Post
router.put('/favoritePost', authToken, MemberService.addFavoritePost);

// 會員移除一個我的最愛Post
router.delete('/favoritePost/:postCuid', authToken, MemberService.removeFavoritePost);

export default router;