import React from 'react';
import PropTypes from 'prop-types';

import BounceInUp from '../BounceInUp';

import './dropdownMenu.css';

const DropdownMenuWrapper = ({isShowMenu, children}) => {
    return (
        <BounceInUp inCondition={isShowMenu}>
            <div className="dropdown-menu-wrapper">
                <div className="arrow-up">
                    <span className="arrow-outer"></span>
                    <span className="arrow-inner"></span>
                </div>
                <ul>
                    {children}
                </ul>
            </div>
        </BounceInUp>
    );
}
DropdownMenuWrapper.propTypes = {
    isShowMenu: PropTypes.bool.isRequired,
};

export default DropdownMenuWrapper;