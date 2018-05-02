import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LazyLoad from 'react-lazyload';
// import WaterWave from 'water-wave';

import Avatar from '../../../../../components/Avatar';
import { removeHTMLTag }  from '../../../../../Utils/stringFormat';
import {addFavoritePost, removeFavoritePost} from '../../../../../redux/member';
import { LikeButton, UndoLikeButton } from '../../../../../components/Buttons/LikeButton';
import { isContainedInArray } from '../../../../../Utils/variableCheck';

import './postCover.css';

const ellipsisTextAfterMaxLength = (text, maxLength) => {
    return text.substring(0, maxLength-1) + '...';
}

const mapStateToProps = state => ({member: state.member});
const mapDispatchToProps = dispatch => (bindActionCreators({
    addFavoritePost: addFavoritePost,
    removeFavoritePost: removeFavoritePost,
}, dispatch));
function PostCover({cuid, cover ,title, avatar, introduction, match, member, addFavoritePost, removeFavoritePost}) {
    const intro =  ellipsisTextAfterMaxLength(removeHTMLTag(introduction), 80);
    let isFavorite = member.cuid ? isContainedInArray(member.favoritePosts, 'postCuid', cuid) : false;
    return (
        <section className="postCover">
            <div className="imageBox u-padding-b-16">
                <LazyLoad height={300}>
                    <img src={cover} alt="" />
                </LazyLoad>
            </div>
            <div className="avatar_title u-padding-l-16 u-padding-r-16">
                <Avatar avatarUrl={avatar} />
                <div className="title font-size-18 font-weight-5 u-mb-16">{title}</div>
            </div>
            <div className="introduceContent font-size-16 u-padding-l-16 u-padding-r-16">
                {intro}
            </div>
            <hr className="hr-line-style1" />
            <div className="postCover-footer u-padding-l-16 u-padding-r-16 u-padding-b-8 u-clearfix">
                <div className="more u-push-left line-height-32">
                    <Link to={`/post/${cuid}`}>更多資訊</Link>
                </div>
                <div className="stream u-push-right">
                {
                    isFavorite ?
                    <UndoLikeButton removeFavoritePost={() => removeFavoritePost(cuid)} isShowText={false} />
                    :
                    <LikeButton addFavoritePost={() => addFavoritePost(cuid)} isShowText={false} />
                }
                </div>
            </div>
        </section>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(PostCover);