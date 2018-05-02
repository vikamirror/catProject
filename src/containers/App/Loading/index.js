import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LoadingSpinner from './LoadingSpinner';

const mapStateToProps = state => ({
    isLoading: state.isLoading,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));

const Loading = ({isLoading}) => {
    if (isLoading) {
        return (
            <div className="loadingWrapper u-wrapper-fixed-w100-h100 z-index-100 u-text-center">
                <LoadingSpinner isLoading={isLoading} />
            </div>
        );
    } else {
        return ''
    }
}

Loading.propTypes = {
    isLoading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Loading);