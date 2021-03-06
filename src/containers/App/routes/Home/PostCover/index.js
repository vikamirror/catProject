import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Avatar from '../../../../../components/Avatar';
import { removeImgLinkTag, removeHTMLTag, ellipsisTextAfterMaxLength }  from '../../../../../Utils/stringFormat';
import {addFavoritePost, removeFavoritePost} from '../../../../../redux/member';
import { isContainedInArray } from '../../../../../Utils/variableCheck';
// import DraftEditor from '../../../../../components/FormInputs/DraftEditor';
import ReadOnlyEditor from '../../../../../components/QuillEditor/QuillEditorReadOnly';

import './postCover.css';

const mapStateToProps = state => ({member: state.member});
const mapDispatchToProps = dispatch => (bindActionCreators({
    addFavoritePost: addFavoritePost,
    removeFavoritePost: removeFavoritePost,
}, dispatch));
function PostCover({cuid, cover ,title, avatar, introduction, match, member, addFavoritePost, removeFavoritePost}) {
    const intro =  ellipsisTextAfterMaxLength(removeHTMLTag(introduction), 80);
    let isFavorite = member.cuid ? isContainedInArray(member.favoritePosts, 'cuid', cuid) : false;
    return (
        <article className="postCover">
            <div className="imageBox u-padding-b-16">
                <img src={cover} alt="" />
            </div>
            <div className="avatar_title u-padding-l-16 u-padding-r-16">
                <Avatar avatarUrl={avatar} />
                <div className="title font-size-18 font-weight-5 u-mb-16">{title}</div>
            </div>
            <div className="introduceContent font-size-16 u-padding-l-16 u-padding-r-16">
                {/* {intro} */}
                {/* <DraftEditor
                    content={introduction}
                    isEdit={false}
                    enableUploadImg={false}
                /> */}
                <ReadOnlyEditor
                    content={intro}
                    placeholder="貓咪的故事......"
                />
            </div>
            <hr className="hr-line-style1" />
            <div className="postCover-footer u-padding-l-16 u-padding-r-16 u-padding-b-8 u-clearfix">
                <div className="more u-push-left line-height-32">
                    {/* <Link to={`/post/${cuid}`}>更多資訊</Link> */}
                    更多資訊
                </div>
                <div className="stream u-push-right">
                {
                    isFavorite ?
                    <span className="icon-btn font-size-16 line-height-32 font-lightcoral"><i className="icon icon-heart" /></span>
                    :
                    <span className="icon-btn font-size-16 line-height-32"><i className="icon icon-heart-empty" /></span>
                }
                </div>
            </div>
        </article>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCover);