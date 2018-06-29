import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import './discover.css';

const Discover = () => {
    return (
        <div className="discover-wrapper u-margin-header">
            <div className="container">
                <div className="tabs">
                    <ul>
                        <li>
                            <button className="btn btn-text">全部</button>
                        </li>
                        <li>
                            <button className="btn btn-text">台北市</button>
                        </li>
                        <li>
                            <button className="btn btn-text">新北市</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Discover;