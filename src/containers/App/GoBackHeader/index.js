import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { goBack_header } from '../../../redux/header';

import './goBackHeader.css';

const mapStateToProps = state => ({
    header: state.header,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
const GoBackHeader = ({header, history}) => {
    if (header !== goBack_header) {
        return '';
    };
    return (
        <header className="header z-index-97 goBackHeader">
            <div className="container">
                <nav className="nav">
                    <div className="font-size-18 line-height-56 u-text-center">通知</div>
                    <button className="btn icon-btn btn-text" onClick={() => history.goBack()}>
                        <i className="icon font-size-18 icon-left-open" />
                    </button>            
                </nav>
            </div>
        </header>
    );
};
GoBackHeader.propTypes = {
    header: PropTypes.string.isRequired,
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GoBackHeader));