import express from 'express';
import * as MessageService from '../services/message.service';
import authToken from '../middlewares/authToken';

const router = express.Router();

router.use((req, res, next) => {
    // Website you wish to allow to connect
   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
   // Request methods you wish to allow
   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
   // Request headers you wish to allow
   res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
   next();
});


// 會員對一個文章發新留言
router.post('/message', authToken, MessageService.postMessage);

// 取得一篇文章的所有留言
router.get('/messages/:postCuid', MessageService.getMessages);

export default router;