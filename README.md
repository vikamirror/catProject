<img src="./build/favicon.ico" width="100" height="100">

# CatProject
A minimal forum application for cat discussion.
Demo application is deployed on AWS EC2. Please try it out: https://catcrush.club

## Features
* User registration/login via email or facebook.
<br>![user-login](https://imgur.com/cw2O2sk.jpg)
* User can search article by using search bar.
<br>![search-bar](https://imgur.com/o6CbmzJ.jpg)
* Member can post/modify/delete an article.
<br>![editor view](https://imgur.com/hjP1kOE.jpg)
* Member can leave comment under a post.
<br>![leave message](https://imgur.com/IloklMQ.jpg)
* Member will receive a notification after receiving a tagged message.
<br>![notification view](https://imgur.com/bvR080H.jpg)
* Member can save their favorite posts.
<br>![notification view](https://imgur.com/NGiBjIl.jpg)
* Member can edit thier profile page.
<br>![notification view](https://imgur.com/R9TsNVN.jpg)
* Mobile-friendly.
<br>![home view](https://imgur.com/P3AN4gy.jpg)

## Tech/framework used
### Front End
- #### React Ecosystem
  - [create-react-app](https://github.com/facebook/create-react-app)
  - [react-router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)
  - [redux](https://github.com/reduxjs/redux)
  - [react-quill](https://github.com/zenoamaro/react-quill)
- #### Server Side Rendering
  - [cra-ssr](https://github.com/cereallarceny/cra-ssr)
  - [react-router-redux](https://github.com/reactjs/react-router-redux)
  - [react-helmet](https://github.com/nfl/react-helmet)
- #### XMLHttpRequests
  - [axios](https://github.com/axios/axios)
  - Async/Await
- #### CSS
  - [Bootstrap](https://github.com/twbs/bootstrap)
  - [react-transition-group](https://github.com/reactjs/react-transition-group)

### Back End
- #### Framework
  - [expressjs](https://github.com/expressjs/express)
- #### DataBase
  - [mongoose](https://github.com/Automattic/mongoose)
  - [redis](https://github.com/antirez/redis)
- #### Security
  - [TLS](https://www.sslforfree.com/) - SSL certificate
  - [Helmet](https://github.com/helmetjs/helmet) - HTTP Response Header
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
  - [sanitize-html](https://github.com/punkave/sanitize-html) - XSS
  - crypto - basic password hashing
- #### Web Socket
  - [socket.io](https://github.com/socketio/socket.io)

## Documentations
- [API Doc](https://catcrush.club/apiDoc/index.html)
## Directory Structure
```bash
  ├── build
  ├── node_modules
  ├── public
  │   ├── font
  │   ├── images
  │   ├── favicon.ico
  │   ├── index.html
  │   ├── manifest.json
  ├── server
  │   ├── index.js
  │   ├── server.js
  │   ├── serverStore.js
  │   ├── mongoose
  │   ├── redis
  │   ├── sockets
  │   │   └── *.js
  │   ├── routes
  │   │   ├── universal.js
  │   │   ├── api
  │   │   │   ├── controllers
  │   │   │   │   └── *.controller.js
  │   │   │   ├── services
  │   │   │   │   └── *.service.js
  │   │   │   ├── models
  │   │   │   │   └── *.model.js
  │   │   │   ├── middlewares
  │   └── └── └── └── *.model.js
  ├── src
  │   ├── index.js
  │   ├── registerServiceWorker.js
  │   ├── store.js
  │   ├── basic.css
  │   ├── bootstrapGrid.css
  │   ├── components
  │   │   └── **/*.js/*.css
  │   ├── containers
  │   │   └── App
  │   │       ├── index.js
  │   │       ├── app.css
  │   │       ├── **/*.js/*.css
  │   │       └── routes
  │   │           ├── index.js
  │   │           └── **/*.js/*.css
  │   ├── fetch
  │   │   └── *.js
  │   ├── redux
  │   │   ├── index.js
  │   │   └── *.js
  │   ├── sockets
  │   │   └── *.js
  │   └── Utils
  ├── .env
  ├── .eslintrc
  ├── .gitignore
  ├── package.json
  └── yarn.lock
```
## Run on your own server
### Environmental requirement
- Node.js > v8.11.2
- NPM / Yarn
- Git

```
$ git clone https://github.com/vikamirror/catProject
```
### Install dependencies
- Using npm:
```
$ npm i
```
- Using yarn:
```
$ yarn
```

### To run the app in development environment:
```
$ yarn run server
```
The app will run on port `3009`. Visit http://localhost:3009 (if you ran the dev), you will see the app is running via server side rendering. Please note that the development environment will **not** include Hot-Reload.
<br>
If you need reload after edits on client side, you can open another terminal and run the script `yarn start` for client side rendering on port `3000`(based on *create-react-app*).
```
$ yarn start
```
However, do **not** close the terminal on port `3009` simultaneously, or the app will lose connection to server.
