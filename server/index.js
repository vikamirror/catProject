require('ignore-styles');

// Set up babel to do its thing... env for the latest toys, react-app for Creat React App
require('babel-register')({
    ignore: /\/(build|node_modules)\//,
    presets: ['env', 'react-app']
});

// 讓nodejs可以讀取根目錄的.env檔
require('dotenv').load();

// Now that the nonsense is over... load up the server entry point
require('./server');