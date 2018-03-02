import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export default function authToken(req, res, next) {
    const token = JSON.parse(req.headers.authorization).token; // 沒有token的話 為undefined
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            decoded ? next() : res.send(JSON.stringify({ validToken: false }));
        });
    } else {
        res.send({ validToken: false });
    }
}