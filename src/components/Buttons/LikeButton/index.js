import React from 'react';
import PropTypes from 'prop-types';

import WaterWave from '../../WaterWave';

export const LikeButton = ({addFavoritePost, isShowText}) => (
    <button className="stream-item btn btn-text" onClick={() => addFavoritePost()}>
        <span className="font-size-14 u-margin-r-8">{isShowText ? '收藏' : ''}</span> 
        <span className="icon-btn font-size-16"><i className="icon icon-heart-empty" /></span>
        <WaterWave duration={800} color="#f9adadd4" radius={50} />
    </button>
);
LikeButton.PropTypes = {
    addFavoritePost: PropTypes.func.isRequired,
    isShowText: PropTypes.bool
};

export const UndoLikeButton = ({removeFavoritePost, isShowText}) => (
    <button className="stream-item btn btn-text" onClick={() => removeFavoritePost()}>
        <span className="font-size-14 u-margin-r-8">{isShowText ? '已收藏' : ''}</span>
        <span className="icon-btn font-size-16 font-lightcoral"><i className="icon icon-heart" /></span>
        <WaterWave duration={500} color="#8e8e8e" radius={50} />
    </button>
);
UndoLikeButton.PropTypes = {
    removeFavoritePost: PropTypes.func.isRequired,
    isShowText: PropTypes.bool
};