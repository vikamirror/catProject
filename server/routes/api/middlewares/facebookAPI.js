import axios from 'axios';

export function hasAccessToken(req, res, next) {
    axios.get('https://graph.facebook.com/me?access_token=' + req.body.accessToken)
         .then((res) => {
             console.log('hasAccessToken res.data:', res.data);
             if (res.data.id === 'undefined') { // 若該用戶沒有有FB id
                res.status(401).json({ message: '請先登入facebook' });
             } else {
                 next();
             }
         })
         .catch((err) => {
             console.log('hasAccessToken, err:', err);
             res.status(401).json({ message: err });
         });
}