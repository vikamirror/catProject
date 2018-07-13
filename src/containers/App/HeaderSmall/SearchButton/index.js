import React from 'react';
import PropTypes from 'prop-types';

import './searchButton.css';

const SearchBarIconBtn = ({clickHandler}) => (
    <div className="u-push-left">
        <div className="searchBar__xs__icon">
            <div
                className="icon-btn"
                onClick={() => clickHandler()}
            >
                <i className="icon icon-search" />
            </div>
        </div>
    </div>
);
SearchBarIconBtn.propTypes = {
    clickHandler: PropTypes.func.isRequired
};

export default SearchBarIconBtn;

