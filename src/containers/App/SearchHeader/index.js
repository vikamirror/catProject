import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchBar from '../Header/SearchBar';
import { search_header } from '../../../redux/header';

const mapStateToProps = state => ({
    header: state.header,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
const SmallDeviceSearchHeader = ({header}) => {
    if (header !== search_header) {
        return '';
    };
    return (
        <header className="header z-index-97 searchHeader">
            <div className="container">
                <nav className="nav">
                    <SearchBar />
                </nav>
            </div>
        </header>
    );
};
SmallDeviceSearchHeader.propTypes = {
    header: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(SmallDeviceSearchHeader);