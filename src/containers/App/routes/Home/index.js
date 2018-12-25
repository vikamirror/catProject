import React, {Component} from 'react';
import Helmet from 'react-helmet';
import { withRouter, Link } from "react-router-dom";
// import { ConnectedRouter } from 'react-router-redux'; // server/client都可使用
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import MasonryLayout from '../../../../components/MasonryLayout';

import PostCover from './PostCover';
import * as sockets from '../../../../sockets/post';
import { addPostList, updatePostList, deletePostList, fetchPosts } from '../../../../redux/postList';

import './home.css';

let fetchAllowed = true;
const mapStateToProps = state => ({
    postList: state.postList,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    addPostList: addPostList,
    updatePostList: updatePostList,
    deletePostList: deletePostList,
    fetchPosts: fetchPosts
}, dispatch));
class Home extends Component {
    componentDidMount () {
        this.toAddPostListListener();
        this.toUpdatePostListListener();
        this.toDeletePostListListener();
        this.scrollListener();
    }
    componentDidUpdate (prevProps) {
        this.isFetchPostsAllowed(prevProps.postList);
    }
    componentWillUnmount () {
        this.removeScrollListener();
    }
    scrollListener () {
        document.addEventListener("scroll", this.shouldLoadMorePosts);
    }
    removeScrollListener () {
        document.removeEventListener("scroll", this.shouldLoadMorePosts);
    }
    isFetchPostsAllowed (prevPostList) {
        if (prevPostList.length === 0) {
            return;
        };
        if (prevPostList.length === this.props.postList.length) {
            return;
        };

        /**
         * 若postList更新了, 檢查postList最後一篇文章的cuid是否相同
         * 不同的話，則允許使用者向下滑的時候繼續fetch新文章
         * 相同的話，代表這是資料庫最後一篇文章了，不用再fetch
         */

        const prevLastPost = prevPostList[prevPostList.length - 1].cuid;
        const currLastPost = this.props.postList[this.props.postList.length - 1].cuid;

        if (prevLastPost === currLastPost) {
            fetchAllowed = false;
            return;
        };

        if (prevLastPost !== currLastPost) {
            fetchAllowed = true;
        };
    }
    shouldLoadMorePosts = () => {
        if (!fetchAllowed) {
            return;
        };
        const lastPost = document.querySelector(".masonry-grid .home__post-link:last-child");
        const lastPostOffset = lastPost.offsetTop + lastPost.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        const offsetForNewPosts = 40;

        const loadPosts = () => {
            if (fetchAllowed) {
                fetchAllowed = false;
                const loadedPosts = this.props.postList.map((post, index) => post.cuid);
                this.props.fetchPosts(loadedPosts);
            };
        };

        if (pageOffset > lastPostOffset - offsetForNewPosts) {
            loadPosts();
        };
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
                <div className="container u-padding-t-24">
                    <MasonryLayout>
                        {
                            this.props.postList.map((post, index) => (
                                <Link
                                    className="home__post-link"
                                    key={index}
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
                            ))
                        }
                    </MasonryLayout>
                </div>     
            </div>
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