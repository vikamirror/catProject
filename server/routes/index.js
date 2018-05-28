import express from 'express';
import universalLoader from './universal';

const router = express.Router();

// Any route that comes in, send it to the universalLoader
router.get('/', universalLoader);

export default router;