import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

export default function authToken(req, res, next) {
    let token;
    if (req.headers.authorization) {
        token = JSON.parse(req.headers.authorization).token;
    }
    if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            decoded ? next() : res.send({ validToken: false });
        });
    } else {
        res.status(401).send({ validToken: false });
    }
}