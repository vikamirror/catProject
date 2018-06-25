import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { searchPosts } from '../../../../redux/postList';

import './searchBar.css';

export const SearchBarIconBtn = ({showMiniSearchBar, toggleMiniSearchBar}) => (
    <div className="u-push-left">
        <div className="searchBar__xs__icon">
            <div
                className={showMiniSearchBar ? 'icon-btn active' : 'icon-btn'}
                onClick={() => toggleMiniSearchBar()}
            >
                <i className="icon icon-search" />
            </div>
        </div>
    </div>
);
SearchBarIconBtn.propTypes = {
    showMiniSearchBar: PropTypes.bool.isRequired,
    toggleMiniSearchBar: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => (bindActionCreators({
    searchPosts: searchPosts
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
        this.props.searchPosts(query);
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
                            onClick={() => this.inputHandler('')}
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);

