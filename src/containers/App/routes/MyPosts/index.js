import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Title from '../../../../components/PostBody/Title';
import DateAndAuthor from '../../../../components/PostBody/DateAndAuthor';
import Charactor from '../../../../components/PostBody/Charactor';
import NewPost from './NewPost';
import * as postAPI from '../../../../fetch/postAPI';
import PostPreview from '../../../../components/PostBody/PostPreview';
import Post from '../Home/Post';
import { addOnePost } from '../../../../redux/postList';

import './myPosts.css';

const mapStateToProps = state => ({ 
    member: state.member
});
const mapDispatchToProps = dispatch => (bindActionCreators({ 
    addOnePost: addOnePost,
}, dispatch));
class MyPosts extends Component{
    constructor () {
        super();
        this.state = {
            myPosts: [],
            isShowNewPostWrapper: false,
        }
    }
    componentDidMount () {
        if (!this.props.member.cuid) {
            this.props.history.push("/");
            return;
        }
        postAPI
            .getPostsByAuthor(this.props.member.cuid)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({myPosts: [...res.data.posts]});
                }
            })
            .catch(err => console.error(err.response.data));
    }
    onFocusNewPost () {
        this.setState({isShowNewPostWrapper: true});
    }
    handleClose () {
        this.setState({isShowNewPostWrapper: false});
    }
    addOnePost (newPost) {
        postAPI
            .createPost(newPost)
            .then((res) => {
                if (res.status === 200) {
                    newPost = res.data.post;
                    this.setState({myPosts: [newPost, ...this.state.myPosts]});
                    this.props.addOnePost(newPost);
                }
            })
            .catch(err => console.error(err.response.data));
    }
    render () {
        return (
            <Router>
                <div>
                    <div className="myPosts-wrapper">
                        <div className="u-margin-header u-padding-b-40">
                            <div className="container">
                                <div className="fake-new-post form u-margin-t-40 u-margin-b-40">
                                    <div className="postWrapper" onClick={() => this.onFocusNewPost()}>
                                        <Title 
                                            isEdit={false} 
                                            title={"新文章"}
                                        />
                                        <hr className="hr-line-style2" />
                                        <DateAndAuthor 
                                            isEdit={false}
                                            author={this.props.member}
                                            dateAdded={new Date()}
                                            lastModify={''} 
                                        /> 
                                        <hr className="hr-line-style1" />
                                        <Charactor 
                                            isEdit={false} 
                                            charactor="寫下貓的故事....."
                                        />
                                    </div>
                                </div>
                                {
                                    this.state.myPosts.map((post, index) => (
                                        <PostPreview key={index} post={post} />
                                    ))
                                }
                            </div>
                        </div>
                        {   
                            this.state.isShowNewPostWrapper ? 
                                <NewPost 
                                    handleClose={() => this.handleClose()}
                                    addOnePost={(newPost) => this.addOnePost(newPost)}
                                /> : ''
                        }
                    </div>
                    <Route exact path={`/post/:cuid`} component={Post} />;
                </div>
            </Router>
        );
    }
}

MyPosts.propTypes = {
    member: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);