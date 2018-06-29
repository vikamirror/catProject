import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import FadeInOut from '../../../components/FadeInOut';

import './smallDeviceFooter.css';

const menu = [{
    linkTo: "/",
    icon: "icon-home",
    text: "首頁"
},{
    linkTo: "/myPosts",
    icon: "icon-pencil",
    text: "我的貼文"
},{
    linkTo: "/myFavorites",
    icon: "icon-heart",
    text: "我的關注"
},{
    linkTo: "/myAccount",
    icon: "icon-user",
    text: "帳號設定"
}];

const Icon = ({itemIcon}) => <span className="icon-btn"><i className={`icon ${itemIcon}`} /></span>;

const mapStateToProps = state => ({
    isSmallDevice: state.isSmallDevice,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
}, dispatch));
const SmallDeviceFooter = ({isScrollDown, isSmallDevice}) => {
    return (
        <FadeInOut inCondition={isSmallDevice && !isScrollDown} milliseconds={200}>
            <div className="sm-device-footer u-padding-t-8 u-padding-b-8">
                <div className="container">
                    <ul className="row">
                        {
                            menu.map((item, index) => (
                                <li
                                    key={index}
                                    className="col-xs-3 u-text-center"
                                >
                                    <Link to={item.linkTo} className="link">
                                        <Icon itemIcon={item.icon} />
                                        <div className="font-size-12">{item.text}</div>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </FadeInOut>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(SmallDeviceFooter);