// https://loading.io/css/

import React from 'react';
import PropTypes from 'prop-types';

import './loadingSpinner.css';

const LoadingSpinner = ({isLoading}) => {
    if (isLoading === false) {
        return '';
    } else {
        return (
            <div className="u-wrapper-absolute-center">
                {/* <div className="lds-css ng-scope spinner-wrapper">
                    <div className="lds-spin">
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                        <div>
                            <div></div>
                        </div>
                    </div>  
                </div> */}
                <div className="lds-hourglass"></div>
            </div>
        );
    }
};

LoadingSpinner.propTypes = {
    isLoading: PropTypes.bool.isRequired,
};

export default LoadingSpinner;