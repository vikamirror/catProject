import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { withRouter, Link } from "react-router-dom";
// import { ConnectedRouter } from 'react-router-redux'; // server/client都可使用
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazy-load';

import PostCover from './PostCover';
import * as sockets from '../../../../sockets/post';
import { addPostList, updatePostList, deletePostList } from '../../../../redux/postList';

import './home.css';

const mapStateToProps = state => ({ 
    postList: state.postList,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    addPostList: addPostList,
    updatePostList: updatePostList,
    deletePostList: deletePostList,
}, dispatch));
class Home extends Component {
    componentDidMount () {
        // if (this.props.location.pathname !== "/") {
        //     this.props.history.push("/");
        //     return;
        // };
        this.toAddPostListListener();
        this.toUpdatePostListListener();
        this.toDeletePostListListener();
    }
    toAddPostListListener () {
        const addPostListBroadcastHandler = (newPost) => {
            this.props.addPostList(newPost);
        };
        sockets.addPostListBroadcastListener(addPostListBroadcastHandler);
    }
    toUpdatePostListListener () {
        const updatePostListBroadcastHandler = (updatedPost) => {
            this.props.updatePostList(updatedPost);
        }
        sockets.updatePostListBroadcastListener(updatePostListBroadcastHandler);
    }
    toDeletePostListListener () {
        const deletePostListBroadcastHandler = (postCuid) => {
            this.props.deletePostList(postCuid);
        }
        sockets.deletePostListBroadcastListener(deletePostListBroadcastHandler);
    }
    render () {
        return (
            <div className="home-container">
                <Helmet>
                    <title>Cat Crush</title>
                </Helmet>
                {/* <div className="u-margin-header"> */}
                    <div className="container u-padding-t-24">
                        <article className="articles">
                            {
                                this.props.postList.map((post, index) => (
                                    <LazyLoad key={index} offsetTop={200}>
                                        <Link
                                            to={{
                                                pathname: `/post/${post.cuid}`,
                                                // this is the trick!
                                                state: {
                                                    isShowPostModal: true,
                                                    modalPath: "/post"
                                                }
                                            }}
                                        >
                                            <PostCover
                                                cuid={post.cuid}
                                                cover={post.cover}
                                                title={post.title}
                                                avatar={post.author.avatar}
                                                introduction={post.charactor} 
                                            />
                                        </Link>
                                    </LazyLoad>
                                ))
                            }
                        </article>
                    </div>     
                </div>
            // </div>
        );
    }
}

Home.propTypes = {
    postList: PropTypes.array.isRequired,
    addPostList: PropTypes.func.isRequired,
    updatePostList: PropTypes.func.isRequired,
    deletePostList: PropTypes.func.isRequired,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));