import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { blank_header } from '../../../redux/header';

const mapStateToProps = state => ({
    header: state.header,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
const GoBackHeader = ({header}) => {
    if (header !== blank_header) {
        return '';
    };
    return (
        <header className="header z-index-97 goBackHeader">
            <div className="container">
                <nav className="nav">
                </nav>
            </div>
        </header>
    );
};
GoBackHeader.propTypes = {
    header: PropTypes.string.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(GoBackHeader);