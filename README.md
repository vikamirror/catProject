<img src="./build/favicon.ico" width="100" height="100">

# CatProject
A minimal forum application for cat discussion.
Demo application is deployed on AWS EC2. Please try it out: https://catcrush.club

## Features
* User registration via email or facebook.
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
  - [create-react-app](https://github.com/facebook/create-react-app) - react v16.0.0
  - [react-router](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom) - v4.2.2
  - [redux](https://github.com/reduxjs/redux) - v3.7.2
  - [react-quill](https://github.com/zenoamaro/react-quill) - v1.2.7
- #### Server Side Rendering
  - [cra-ssr](https://github.com/cereallarceny/cra-ssr)
  - [react-router-redux](https://github.com/reactjs/react-router-redux) - v5.0.0-alpha.6
  - [react-helmet](https://github.com/nfl/react-helmet) - v5.2.0
- #### XMLHttpRequests
  - [axios](https://github.com/axios/axios) - v0.17.1
  - Async/Await
- #### CSS
  - [Bootstrap](https://github.com/twbs/bootstrap) - v3.3.7
  - [react-transition-group](https://github.com/reactjs/react-transition-group) - v2.2.1

### Back End
- [expressjs](https://github.com/expressjs/express)
- #### DataBase
  - [mongoose](https://github.com/Automattic/mongoose)
  - [redis](https://github.com/antirez/redis)
- #### Security
  - [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- #### Web Socket
  - [socket.io v2.1.1](https://github.com/socketio/socket.io)
