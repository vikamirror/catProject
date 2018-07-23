import express from 'express';
import * as NotificationService from '../services/notification.service';
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

// 取得近期tag該會員的50筆message
router.post('/notification', authToken, NotificationService.postNotification);

router.get('/notifications', authToken, NotificationService.getNotifications);

export default router;