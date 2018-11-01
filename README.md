<img src="./build/favicon.ico" width="100" height="100">

# CatProject
A minimal forum application for cat discussion.
Demo application is deployed on AWS EC2. Please try it out: https://catcrush.club

## Features
* User registration/login via email or facebook.
<br>![user-login](https://imgur.com/cw2O2sk.jpg)
* User can search article by using search bar.
* Member can post/modify/delete an article.
* Member can leave comment under a post.
* Member will receive a notification after receiving a tagged message.
* Member can save their favorite posts.
* Member can use keywords to search article.
* Member can edit thier profile page.
* Mobile-friendly.

## View
* Home View
<br>![home view](https://imgur.com/P3AN4gy.jpg)
* Post Edit View
<br>![editor view](https://imgur.com/hjP1kOE.jpg)
* Notification View
<br>![notification view](https://imgur.com/bvR080H.jpg)

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
