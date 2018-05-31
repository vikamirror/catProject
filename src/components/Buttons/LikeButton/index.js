import React from 'react';
import PropTypes from 'prop-types';

import WaterWave from '../../WaterWave';

export const LikeButton = ({addFavoritePost, isShowText}) => (
    <button className="stream-item btn btn-text" onClick={() => addFavoritePost()}>
        {isShowText ? '收藏' : ''}     
        <div className="icon-btn"><i className="icon font-size-18 icon-heart-empty" /></div>
        <WaterWave duration={800} color="#f9adadd4" radius={50} />
    </button>
);
LikeButton.PropTypes = {
    addFavoritePost: PropTypes.func.isRequired,
    isShowText: PropTypes.bool
};

export const UndoLikeButton = ({removeFavoritePost, isShowText}) => (
    <button className="stream-item btn btn-text" onClick={() => removeFavoritePost()}>
        {isShowText ? '已收藏' : ''}
        <div className="icon-btn font-lightcoral"><i className="icon font-size-18 icon-heart" /></div>
        <WaterWave duration={500} color="#8e8e8e" radius={50} />
    </button>
);
UndoLikeButton.PropTypes = {
    removeFavoritePost: PropTypes.func.isRequired,
    isShowText: PropTypes.bool
};