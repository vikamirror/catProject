import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import MyPosts from './MyPosts';
import Post from './Home/Post';
import MyFavorites from './MyFavorites';

export default () => (
    <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/myPosts" component={MyPosts} />
        <Route exact path="/myFavorites" component={MyFavorites} />
        <Route exact path="/" component={Home} />
        <Route exact path={`/post/:cuid`} component={Post} />
        <Redirect to="/" />
        {/* <Route component={NotFound} /> */}
    </Switch>
);