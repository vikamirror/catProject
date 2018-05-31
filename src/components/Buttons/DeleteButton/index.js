import React from 'react';
// import PropTypes from 'prop-types';

const DeleteButton = ({onClickDelete}) => {
    return (
        <button className="stream-item btn btn-text" onClick={() => onClickDelete()}>
            刪除
            <div className="icon-btn"><i className="icon font-size-18 icon-trash-empty" /></div>
        </button>
    );
};

export default DeleteButton;