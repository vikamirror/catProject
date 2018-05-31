import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { addFavoritePost, removeFavoritePost } from '../../../redux/member';
import { LikeButton, UndoLikeButton } from '../../Buttons/LikeButton';
import { isContainedInArray } from '../../../Utils/variableCheck';

import './stream.css';

const mapStateToProps = state => ({
    member: state.member,
    post: state.post,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    addFavoritePost: addFavoritePost,
    removeFavoritePost: removeFavoritePost,
}, dispatch));
const Stream = ({member, post, addFavoritePost, removeFavoritePost}) => {
    if (!member.cuid || !post.cuid) {
        return '';
    }
    const isFavorite = isContainedInArray(member.favoritePosts, 'postCuid', post.cuid);
    const isAuthor = member.cuid === post.author.cuid ? true : false;
    const IsLike = () => (
        isFavorite ? <UndoLikeButton removeFavoritePost={() => removeFavoritePost(post.cuid)} isShowText={true} />
                     :
                     <LikeButton addFavoritePost={() => addFavoritePost(post.cuid)} isShowText={true} />
    );
    return (
        <div className="stream u-text-right line-height-32">
        { isAuthor ? '' : <IsLike /> }
        </div>
    );
};

Stream.propTypes = {
    member: PropTypes.shape({
        cuid: PropTypes.string,
        favoritePosts: PropTypes.array,
    }),
    post: PropTypes.shape({
        cuid: PropTypes.string,
        author: PropTypes.shape({
            cuid: PropTypes.string,
        }),
    }),
    addFavoritePost: PropTypes.func.isRequired,
    removeFavoritePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Stream);