import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';

const jwtSecret = process.env.JWT_SECRET;

export default function authToken(req, res, next) {
    let token;
    if (req.headers.authorization) {
        // token = JSON.parse(req.headers.authorization).token;
        token = sanitizeHtml(JSON.parse(req.headers.authorization).token);
    };
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            decoded ? next() : res.status(401).json({message: "請重新登入", validToken: false});
        });
    } else {
        res.status(401).json({message: "請重新登入", validToken: false});
    };
};