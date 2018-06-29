import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { requestSearch } from '../../../../redux/searchPosts';
import { showInitialHeader } from '../../../../redux/header';

import './searchBar.css';

export const SearchBarIconBtn = ({toggleMiniSearchBar}) => (
    <div className="u-push-left">
        <div className="searchBar__xs__icon">
            <div
                className="icon-btn" /*{showMiniSearchBar ? 'icon-btn active' : 'icon-btn'}*/
                onClick={() => toggleMiniSearchBar()}
            >
                <i className="icon icon-search" />
            </div>
        </div>
    </div>
);
SearchBarIconBtn.propTypes = {
    toggleMiniSearchBar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isSmallDevice: state.isSmallDevice,
    searchPosts: state.searchPosts,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    requestSearch: requestSearch,
    showInitialHeader: showInitialHeader,
}, dispatch));
class SearchBar extends Component {
    constructor () {
        super ();
        this.state = {
            inputValue: ''
        };
    }
    inputHandler (value) {
        this.setState({inputValue: value});
    }
    pressEnter (evt) {
        if (evt.keyCode === 13) {
            this.reqSearch();
            evt.preventDefault();
        }
    }
    reqSearch () {
        const query = this.state.inputValue;
        const loadedIds = this.props.searchPosts.loadedIds;
        this.props.requestSearch(query, loadedIds);
        this.props.history.push(`/search/${query}`);
    }
    clearSearch () {
        this.setState({inputValue: ''});
        if (this.props.isSmallDevice) {
            this.props.showInitialHeader();
        };
    }
    render () {
        return (
            <div className="u-clearPadding">
                <div className="searchBar">
                    <div className="form search-form-field icon-search">
                        <input
                            type="text"
                            value={this.state.inputValue}
                            onChange={(evt) => this.inputHandler(evt.target.value)}
                            onKeyUp={(evt) => this.pressEnter(evt)}
                        />
                        <button 
                            className="btn clear"
                            onClick={() => this.clearSearch()}
                        >
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));

