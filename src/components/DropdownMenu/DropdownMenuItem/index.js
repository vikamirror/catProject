import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './dropdownMenuItem.css';

const Icon = ({itemIcon}) => <span className="icon-btn"><i className={`icon ${itemIcon}`} /></span>;

const MenuItem = ({itemType, linkTo, clickHandler, hasIcon, itemIcon, itemText, divider}) => {
    switch (itemType) {
        case "button":
            return (
                <div>
                    <li className="menuItem">
                        <button className="btn btn-text" onClick={() => clickHandler()}>
                            {hasIcon ? <Icon itemIcon={itemIcon} /> : ''}
                            {itemText}
                        </button>
                    </li>
                </div>
            );
        case "link":
            return (
                <li className="menuItem">
                    <Link to={linkTo} className="link">
                        {hasIcon ? <Icon itemIcon={itemIcon} /> : ''}
                        {itemText}
                    </Link> 
                </li>
            );
        case "divider":
            return <li className="menuItem divider"></li>;
        default:
            return (
                <li className="menuItem">
                    {hasIcon ? <Icon itemIcon={itemIcon} /> : ''}
                    {itemText}
                </li>
            );
    }
}
MenuItem.propTypes = {
    itemType: PropTypes.string.isRequired,
    linkTo: PropTypes.string,
    clickHandler: PropTypes.func,
    hasIcon: PropTypes.bool.isRequired,
    itemIcon: PropTypes.string,
    itemText: PropTypes.string,
};


export default MenuItem;