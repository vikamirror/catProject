import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PostWrapper from '../PostWrapper';
import Title from '../PostBody/Title';
import DateAndAuthor from '../PostBody/DateAndAuthor';
import Cover from '../PostBody/Cover';
import Charactor from '../PostBody/Charactor';
import CityAndDistrict from '../PostBody/CityAndDistrict';
import Age from '../PostBody/Age';
import Gender from '../PostBody/Gender';
import Spay from '../PostBody/Spay';
import Requirements from '../PostBody/Requirements';
import Contact from '../PostBody/Contact';
import Stream from '../PostBody/Stream';
import Edit from '../PostBody/Edit';
import PostReply from '../PostReply';
import { fetchOnePost, savePost, rollBackPost } from '../../redux/post';
import { updateMyPost, deleteMyPost } from '../../redux/myPosts';
import { updatePostList, deletePostList } from '../../redux/postList';
import { loadingTrue, loadingFalse } from '../../redux/isLoading';
import { showDialog } from '../../redux/dialog';
import * as postAPI from '../../fetch/postAPI';
import * as sockets from '../../sockets/post';
import { errorLog } from '../../Utils/console';

import '../PostBody/postBody.css';

const mapStateToProps = state => ({
    post: state.post,
    dialog: state.dialog,
    // routing: state.routing,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    fetchOnePost: fetchOnePost,
    savePost: savePost,
    rollBackPost: rollBackPost,
    updateMyPost: updateMyPost,
    updatePostList: updatePostList,
    showDialog: showDialog,
    deleteMyPost: deleteMyPost,
    deletePostList: deletePostList,
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
}, dispatch));
class PostModal extends Component {
    componentDidMount () {
        this.props.loadingTrue();
        postAPI
            .getOnePost(this.props.match.params.cuid)
            .then((res) => {
                if (res.status === 200) {
                    // console.log('res.data.post', res.data.post);
                    if (!res.data.post) {
                        this.postNotFound();
                        this.props.loadingFalse();
                    } else {
                        this.props.fetchOnePost(res.data.post);
                        this.props.loadingFalse();
                    }
                }
            })
            .catch(err => errorLog('fetchOnePost Error:', err.response.message));
    }
    postNotFound () {
        const pushToHome = (confirmValue) => {
            if (confirmValue.confirm) {
                this.props.history.push('/');
            }
        }
        this.props.showDialog({
            type: 'warning',
            title: 'Oops, 此文章已被刪除',
            confirmButtonText: '知道了',
            onClickConfirmButton: (confirmValue) => pushToHome(confirmValue),
        });
    }
    handleUpdate () {
        this.props.loadingTrue();
        const postForUpdate = {
            cuid: this.props.post.cuid,
            title: this.props.post.title,
            cover: this.props.post.cover,
            story: this.props.post.story,
            charactor: this.props.post.charactor,
            city: this.props.post.city,
            district: this.props.post.district,
            age: this.props.post.age,
            gender: this.props.post.gender,
            isSpay: this.props.post.isSpay,
            requirements: this.props.post.requirements,
            remark: this.props.post.remark,
            contact: this.props.post.contact,
            contactInfo: this.props.post.contactInfo
        };
        postAPI
            .updatePost(postForUpdate)
            .then((res) => {
                if (res.status === 200) {
                    const updatedPost = res.data.post;
                    this.props.savePost(updatedPost);
                    this.props.updateMyPost(updatedPost);
                    this.props.updatePostList(updatedPost);
                    this.props.loadingFalse();
                    sockets.updatePostListBroadcastEmitter(updatedPost);
                }
            })
            .catch(err => {
                this.props.showDialog({
                    type: 'warning',
                    title: err.response.data.message,
                    confirmButtonText: '知道了',
                });
                this.props.loadingFalse();
            });
    }
    handleCancel () {
        const cancelUpdate = (confirmValue) => {
            if (confirmValue.confirm) {
                this.props.rollBackPost();
            };
        };
        this.props.showDialog({
            type: 'question',
            title: '放棄編輯？',
            showCancelButton: true,
            cancelButtonText: "取消",
            showConfirmButton: true,
            confirmButtonText: "確定",
            onClickConfirmButton: (confirmValue) => cancelUpdate(confirmValue),
            buttonsAlign: "center",
        });
    }
    handleDelete () {
        const shouldDeletePost = (confirmValue) => {
            if (confirmValue.confirm) {
                this.props.loadingTrue();
                postAPI
                    .deletePost(this.props.post.cuid)
                    .then((res) => {
                        if (res.status === 200) {
                            this.props.deleteMyPost(this.props.post.cuid);
                            this.props.deletePostList(this.props.post.cuid);
                            sockets.deletePostListBroadcastEmitter(this.props.post.cuid);
                            this.props.history.goBack();
                            this.props.loadingFalse();
                        }
                    })
                    .catch(err => errorLog(err));
            }
        }
        this.props.showDialog({
            type: 'warning',
            title: '確定刪除這篇文章?',
            showCancelButton: true,
            cancelButtonText: "取消",
            showConfirmButton: true,
            confirmButtonText: "確定",
            onClickConfirmButton: (confirmValue) => shouldDeletePost(confirmValue),
            buttonsAlign: "center",
            modalVerticalAlign: "middle"
        });
    }
    handleScrollToModalTop () {
        const targetWrapper = document.getElementById("post-wrapper-id");
        const scrollTo = (element, to, miliseconds) => {
            if (miliseconds <= 0) return;
            let distance = to - element.scrollTop;
            var perTick = distance / miliseconds * 10;
            setTimeout(() => {
                element.scrollTop = element.scrollTop + perTick;
                if (element.scrollTop === to) return;
                scrollTo(element, to, miliseconds - 10);
            }, 20);
        };
        scrollTo(targetWrapper, -600, 100);
    }
    render () {
        const {
            isEdit,
            title,
            author,
            dateAdded,
            lastModify,
            cover,
            charactor,
            city,
            district,
            age,
            gender,
            isSpay, 
            requirements,
            remark,
            contact,
            contactInfo
        } = this.props.post;
        return (
            <div className="post-modal">
                {
                    isEdit ? '' :  <Helmet><title>{title}</title></Helmet>
                }
                <PostWrapper 
                    onClickSubmit={() => this.handleUpdate()}
                    onClickCancel={() => this.handleCancel()}
                >
                    <Edit
                        isEdit={isEdit}
                        handleDelete={() => this.handleDelete()}
                        scrollToTop={() => this.handleScrollToModalTop()}
                    />
                    <Title
                        ref={node => this.titleNode = node} 
                        isEdit={isEdit}
                        title={title} 
                    />
                    <hr className="hr-line-style1" />
                    <DateAndAuthor
                        isEdit={isEdit} 
                        author={author}
                        dateAdded={dateAdded}
                        lastModify={lastModify} 
                    />
                    <Cover 
                        isEdit={isEdit}
                        cover={cover}
                    />
                    <hr className="hr-line-style1" />
                    <Charactor 
                        isEdit={isEdit}
                        charactor={charactor}
                    />
                    <hr className="hr-line-style1" />
                    <CityAndDistrict 
                        isEdit={isEdit}
                        city={city}
                        district={district}
                    />
                    <hr className="hr-line-style1" />
                    <Age 
                        isEdit={isEdit}
                        age={age}
                    />
                    <hr className="hr-line-style1" />
                    <Gender
                        isEdit={isEdit}
                        gender={gender}
                    />
                    <hr className="hr-line-style1" />
                    <Spay
                        isEdit={isEdit}
                        isSpay={isSpay}
                    />
                    <hr className="hr-line-style1" />
                    <Requirements
                        isEdit={isEdit}
                        requirements={requirements}
                        remark={remark}
                    />
                    <hr className="hr-line-style1" />
                    <Contact
                        isEdit={isEdit} 
                        contact={contact}
                        contactInfo={contactInfo}
                    />
                    <hr className="hr-line-style1" />
                    <Stream />
                    
                    { isEdit ? '' : <PostReply /> }
                </PostWrapper>
            </div>
        ); 
    }
}
PostModal.propTypes = {
    post: PropTypes.shape({
        cuid: PropTypes.string,
        title: PropTypes.string.isRequired,
        isEdit: PropTypes.bool.isRequired,
        author: PropTypes.shape({
            cuid: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            avatar: PropTypes.string.isRequired,
        }),
        dateAdded: PropTypes.string.isRequired,
        lastModify: PropTypes.string,
        cover: PropTypes.string.isRequired,
        charactor: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        district: PropTypes.string.isRequired,
        age: PropTypes.string.isRequired.isRequired,
        gender: PropTypes.string.isRequired,
        isSpay: PropTypes.bool.isRequired,
        requirements: PropTypes.array.isRequired,
        remark: PropTypes.string.isRequired,
        contact: PropTypes.string.isRequired,
        contactInfo: PropTypes.string.isRequired,
    }),
    fetchOnePost: PropTypes.func.isRequired,
    savePost: PropTypes.func.isRequired,
    updateMyPost: PropTypes.func.isRequired,
    rollBackPost: PropTypes.func.isRequired,
    updatePostList: PropTypes.func.isRequired,
    showDialog: PropTypes.func.isRequired,
    deleteMyPost: PropTypes.func.isRequired,
    deletePostList: PropTypes.func.isRequired,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostModal));