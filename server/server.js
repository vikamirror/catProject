import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import socket_io from 'socket.io';

import index from './routes';
import universalLoader from './routes/universal';

import memberRoutes from './routes/api/controllers/member.controller';
import postRoutes from './routes/api/controllers/post.controller';
import messageRoutes from './routes/api/controllers/message.controller';
import notificationRoutes from './routes/api/controllers/notification.controller';

import sockets from './sockets';

// import database from './mongoose';
import database from './mongoose';
import redis from './redis';

// Create our express app (using the port optionally specified)
const app = express();

// Compress, parse, and log
app.use(compression()); // gzip 壓縮
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/', index); // 從首頁進入時

// Set up route handling, include static assets and an optional API
app.use(express.static(path.resolve(__dirname, '../build'))); // 以build為檔案的根目錄
// 引入api
app.use('/api', memberRoutes);
app.use('/api', postRoutes);
app.use('/api', messageRoutes);
app.use('/api', notificationRoutes);
app.use('/', universalLoader); // 從其他頁面進入時

const server = http.createServer(app);
const io = socket_io(server);
const PORT = process.env.SERVER_PORT || 3000;
// app.listen(PORT, () => console.log(`已啟動PORT: ${PORT}!`));
server.listen(PORT, () => console.log(`已啟動PORT: ${PORT}!`));

// 啟動redis
redis();
// 啟動socket
sockets(io);
