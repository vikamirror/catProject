import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';

import index from './routes';
import universalLoader from './routes/universal';
import memberRoutes from './routes/api/controllers/member.controller';

// import database from './mongoose';
import database from './mongoose';

// Create our express app (using the port optionally specified)
const app = express();

// Compress, parse, and log
app.use(compression()); // gzip 壓縮
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

// 引入api
app.use('/api', memberRoutes);
app.use('/', index); // 引入univeral.js
// app.use('/', universalLoader);

// Set up route handling, include static assets and an optional API
app.use(express.static(path.resolve(__dirname, '../build'))); // 以build為檔案的根目錄

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => console.log(`已啟動PORT: ${PORT}!`));
