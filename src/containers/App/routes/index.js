import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Home from './Home';
import Search from './Search';
import Register from './Register';
import Login from './Login';
import MyPosts from './MyPosts';
import PostModal from '../../../components/PostModal';
import NewPost from './MyPosts/NewPost';
import MyFavorites from './MyFavorites';
import MyAccount from './MyAccount';
import NotificationsSM from './NotificationsSM';

const AppRoutes = ({location}) => {
    const isShowNewPostModal = !!(location.state && location.state.isShowNewPostModal);
    const isShowPostModal = !!(location.state && location.state.isShowPostModal);
    // const isLogin = !!(member.cuid);
    return (
        <main id="app-routes" className="u-margin-header">      
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/myAccount" component={MyAccount} />
                <Route exact path="/notifications" component={NotificationsSM} />
                <Route exact path="/myFavorites" component={MyFavorites} />
                <Route exact path="/myPosts" component={MyPosts} />
                <Route exact path="/search/:query" component={Search} />
                {isShowPostModal ? <Route exact path={`${location.state.modalPath}/:cuid`} component={PostModal} /> : null}
                {isShowNewPostModal ? <Route exact path="/myPosts/newPost" component={NewPost} /> : null}
                <Redirect to="/" />
            </Switch>
        </main>
    );
};

export default AppRoutes;