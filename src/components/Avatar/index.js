import React from 'react';
// import PropTypes from 'prop-types';

const Avatar = ({avatarUrl}) => (
    <div className="avatar">
        <div className="imageBox">
            <div className="imageBox__ratio">
                {
                    avatarUrl ? 
                    <div className="image" style={{ backgroundImage: `url(${avatarUrl})` }} /> : ''
                }
            </div>
        </div>
    </div>
);

// Avatar.propTypes = {
//     avatarUrl: PropTypes.string.isRequired
// };

export default Avatar;