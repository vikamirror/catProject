// Any route that comes in, send it to the universalLoader
import express from 'express';
import universalLoader from './universal';

const router = express.Router();

const headerAvoidCache = (req, res, next) => {
    res.setHeader('Last-Modified', new Date().toUTCString());
    next();
};

router.get('/', headerAvoidCache, universalLoader);

export default router;