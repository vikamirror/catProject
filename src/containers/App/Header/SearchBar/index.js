import React from 'react';
import PropTypes from 'prop-types';

import './searchBar.css';

function SearchBar(props) {
    return (
        <div className="searchBar_box">
            <div className="u-push-left u-xs-visible u-sm-hidden">
                <div className="searchBar__xs__icon">
                    <a
                        className={props.showMiniSearchBar ? 'icon-btn active' : 'icon-btn'}
                        onClick={() => props.toggleMiniSearchBar()}
                    >
                        <i className="icon icon-search" />
                    </a>
                </div>
            </div>
            <div className="col-sm-5 col-md-5 u-xs-hidden u-clearPadding">
                <div className="searchBar">
                    <form className="form search-form-field icon-search">
                        <input type="text" />
                    </form>
                </div>
            </div>
        </div>
    );
}

SearchBar.propTypes = {
    showMiniSearchBar: PropTypes.bool.isRequired,
    toggleMiniSearchBar: PropTypes.func.isRequired,
};

export default SearchBar;