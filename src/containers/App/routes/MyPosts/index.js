import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
// import { Route, Link, Switch } from "react-router-dom";
// import { ConnectedRouter } from 'react-router-redux';

import Title from '../../../../components/PostBody/Title';
// import DateAndAuthor from '../../../../components/PostBody/DateAndAuthor';
import Charactor from '../../../../components/PostBody/Charactor';
// import NewPost from './NewPost';
// import * as postAPI from '../../../../fetch/postAPI';
import PostPreview from '../../../../components/PostBody/PostPreview';
// import Post from '../Home/Post';
// import PostModal from '../../../../components/PostModal';
import { fetchMyPosts } from '../../../../redux/myPosts';

import './myPosts.css';

const mapStateToProps = state => ({ 
    member: state.member,
    myPosts: state.myPosts,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    fetchMyPosts: fetchMyPosts,
}, dispatch));
class MyPosts extends Component{
    constructor () {
        super();
        this.state = {
            shouldRender: false,
            // myPosts: [],
            // isShowNewPostWrapper: false,
        }
    }
    componentDidMount () {
        if (!this.props.member.cuid) {
            this.props.history.push("/");
            return;
        }
        this.setState({shouldRender: true});
        this.props.fetchMyPosts();
    }
    render () {
        if (!this.state.shouldRender) {
            return '';
        }
        return (
            <div className="myPosts-wrapper">
                <div className="u-margin-header u-padding-b-40">
                    <div className="container">
                        <div className="fake-new-post form u-margin-b-40">
                            <div className="postWrapper">
                                <Link to={{
                                    pathname: "/myPosts/newPost",
                                    state: {isShowNewPostModal: true},
                                }}>
                                    <Title 
                                        isEdit={false}
                                        title="新文章"
                                    />
                                    <hr className="hr-line-style1" />
                                    {/* <DateAndAuthor 
                                        isEdit={false}
                                        author={this.props.member}
                                        dateAdded={new Date().toISOString()}
                                        lastModify={new Date().toISOString()}
                                    /> 
                                    <hr className="hr-line-style1" /> */}
                                    <Charactor 
                                        isEdit={false} 
                                        charactor=""
                                    />
                                </Link>
                            </div>
                        </div>
                        {
                            this.props.myPosts.map((post, index) => (
                                <PostPreview 
                                    key={index}
                                    post={post}
                                    currentPath="/myPosts"
                                    updateMyPost={(updatedPost) => this.updateMyPost(updatedPost)}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

MyPosts.propTypes = {
    member: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);