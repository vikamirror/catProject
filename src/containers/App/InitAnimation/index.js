import React from 'react';
import PropTypes from 'prop-types';

import './initAnimation.css';

const InitAnimation = ({shouldStart}) => {
    if (shouldStart) {
        return (
            <div className="initAnimation-wrapper u-wrapper-fixed-w100-h100 z-index-100 u-text-center">
                <div className="u-wrapper-absolute-center">
                    <img className="image initAnimation-logo" src="/favicon.ico" alt="logo" />
                </div>
            </div>
        );
    } else {
        return '';
    }
};

InitAnimation.propTypes = {
    shouldStart: PropTypes.bool.isRequired
};

export default InitAnimation;