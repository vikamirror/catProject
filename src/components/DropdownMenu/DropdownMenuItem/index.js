import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import  { ellipsisTextAfterMaxLength } from '../../../Utils/stringFormat';
import { timeFromNow } from '../../../Utils/timeFormat';

import './dropdownMenuItem.css';

const Icon = ({itemIcon}) => <span className="icon-btn"><i className={`icon ${itemIcon}`} /></span>;

const MenuItem = ({itemType, linkTo, clickHandler, hasIcon, itemIcon, boldText, itemText, date, isHighLight}) => {
    switch (itemType) {
        case "button":
            return (
                <li className="menuItem">
                    <button className="btn btn-text" onClick={() => clickHandler()}>
                        {hasIcon ? <Icon itemIcon={itemIcon} /> : ''}
                        {itemText}
                    </button>
                </li>
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
        case "text":
            return (
                <li className="menuItem">
                    {hasIcon ? <Icon itemIcon={itemIcon} /> : ''}
                    {itemText}
                </li>
            );
        case "notification":
            const heighLight = {
                backgroundColor: isHighLight ? '#fdffcc' : 'none',
            };
            return (
                <li className="menuItem" style={heighLight}>
                    <Link 
                        to={linkTo}
                        className="link"
                    >
                        <b>{boldText}</b> 給你的訊息: {ellipsisTextAfterMaxLength(itemText, 30)}
                        <div className="font-size-14">{timeFromNow(date)}</div>
                    </Link>
                </li>
            );
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
    linkTo: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            pathname: PropTypes.string,
            state: PropTypes.shape({
                isShowPostModal: PropTypes.bool,
                modalPath: PropTypes.string,
            })
        }),
    ]),
    clickHandler: PropTypes.func,
    hasIcon: PropTypes.bool,
    itemIcon: PropTypes.string,
    itemText: PropTypes.string,
};
export default MenuItem;