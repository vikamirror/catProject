import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { showInitialHeader } from '../../../../redux/header';

import './searchBar.css';

const mapStateToProps = state => ({
    isSmallDevice: state.isSmallDevice,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
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
        this.props.history.push(`/search/${query}`);
    }
    clearSearch () {
        this.setState({inputValue: ''});
        if (this.props.isSmallDevice) {
            this.props.showInitialHeader();
        };
    }
    render () {
        const { location } = this.props;
        if (location.pathname === "/myPosts" ||
            location.pathname === "/myFavorites" ||
            location.pathname === "/myAccount") {
            return '';
        }
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
SearchBar.propTypes = {
    isSmallDevice: PropTypes.bool.isRequired,
    showInitialHeader: PropTypes.func.isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }),
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchBar));

