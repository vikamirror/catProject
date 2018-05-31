import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import Register from './Register';
import Login from './Login';
import MyPosts from './MyPosts';
// import Post from './Home/Post';
import PostModal from '../../../components/PostModal';
import NewPost from './MyPosts/NewPost';
import MyFavorites from './MyFavorites';

export default ({location}) => {
    const isShowNewPostModal = !!(location.state && location.state.isShowNewPostModal);
    const isShowPostModal = !!(location.state && location.state.isShowPostModal);
    return (
        <div>
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/myFavorites" component={MyFavorites} />
                <Route path="/myPosts" component={MyPosts} />
                <Route path="/" component={Home} />
                {/* <Redirect to="/" /> */}
                {/* <Route component={NotFound} /> */}
            </Switch>
            {isShowPostModal ? <Route path={`${location.state.modalPath}/:cuid`} component={PostModal} /> : null}
            {isShowNewPostModal ? <Route path="/myPosts/newPost" component={NewPost} /> : null}
        </div>
    );
};