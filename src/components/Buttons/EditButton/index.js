import React from 'react';
// import PropTypes from 'prop-types';

const EditButton = ({onClickEdit}) => {
    return (
        <button className="stream-item btn btn-text" onClick={() => onClickEdit()}>
            編輯
            <div className="icon-btn"><i className="icon font-size-18 icon-pencil" /></div>
        </button>
    );
};

export default EditButton;