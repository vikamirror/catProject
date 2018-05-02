import React from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addFavoritePost, removeFavoritePost } from '../../../redux/member';
import { LikeButton, UndoLikeButton } from '../../Buttons/LikeButton';
import { isContainedInArray } from '../../../Utils/variableCheck';

import './stream.css';

const mapStateToProps = state => ({member: state.member});
const mapDispatchToProps = dispatch => (bindActionCreators({
    addFavoritePost: addFavoritePost,
    removeFavoritePost: removeFavoritePost,
}, dispatch));
const Stream = ({member, postCuid, addFavoritePost, removeFavoritePost}) => {
    if (!member.cuid || !postCuid) {
        return '';
    }
    const isFavorite = isContainedInArray(member.favoritePosts, 'postCuid', postCuid);
    return (
        <div className="stream u-text-right line-height-32">
        {
            isFavorite ?
            <UndoLikeButton removeFavoritePost={() => removeFavoritePost(postCuid)} isShowText={true} />
            :
            <LikeButton addFavoritePost={() => addFavoritePost(postCuid)} isShowText={true} />
        }
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Stream);