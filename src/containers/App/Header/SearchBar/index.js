import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import './searchBar.css';

export default class SearchBar extends Component{
    constructor () {
        super();
        this.state = {
            showMiniSearchBar: false,
		};
    }
    toggleMiniSearchBar () {
		this.state.showMiniSearchBar
		? this.setState({ showMiniSearchBar: false })
		: this.setState({ showMiniSearchBar: true });
    }
    render () {
        return (
            <div className="searchBar_box">
                {/* 螢幕<768px */}
                <div className="u-push-left u-xs-visible u-sm-hidden">
                    <div className="searchBar__xs__icon">
                        <div
                            className={this.state.showMiniSearchBar ? 'icon-btn active' : 'icon-btn'}
                            onClick={() => this.toggleMiniSearchBar()}
                        >
                            <i className="icon icon-search" />
                        </div>
                    </div>
                </div>
                {/* 螢幕>768px */}
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
}
