import express from 'express';
import * as MemberService from '../services/member.service';
import authToken from '../middlewares/authToken';
import * as facebookAPI from '../middlewares/facebookAPI';

const router = express.Router();

router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

// 取得會員資料
router.get('/getMember', authToken, MemberService.getMember);

// 會員註冊
router.post('/register', MemberService.register);

// FB註冊or登入
router.post('/loginWithFacebook', facebookAPI.hasAccessToken, MemberService.loginWithFacebook);

// 會員登入
router.post('/login', MemberService.login);

export default router;