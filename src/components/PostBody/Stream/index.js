import React from 'react';
import PropTypes from 'prop-types';
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
const Stream = ({member, postCuid, author, addFavoritePost, removeFavoritePost}) => {
    if (!member.cuid || !postCuid || member.cuid === author.cuid) {
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

Stream.propTypes = {
    member: PropTypes.object.isRequired,
    postCuid: PropTypes.string.isRequired,
    author: PropTypes.object.isRequired,
    addFavoritePost: PropTypes.func.isRequired,
    removeFavoritePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stream);