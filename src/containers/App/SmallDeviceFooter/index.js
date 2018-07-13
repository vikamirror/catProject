import React from 'react';
import PropTypes from 'prop-types';
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
    linkTo: "/notifications",
    icon: "icon-envelope-open-o",
    counter: true,
    text: "訊息"
},{
    linkTo: "/myPosts",
    icon: "icon-pencil",
    text: "我的貼文"
},{
    linkTo: "/myFavorites",
    icon: "icon-heart",
    text: "我的關注"
}];

const nonLoginMenu = [{
    linkTo: "/",
    icon: "icon-home",
    text: "首頁"
},{
    linkTo: "/login",
    icon: "icon-login",
    text: "登入"
},{
    linkTo: "/register",
    icon: "icon-pencil",
    text: "註冊"
}];

const Icon = ({itemIcon}) => <span className="icon-btn"><i className={`icon ${itemIcon}`} /></span>;
const NotifyCounter = ({count}) => count ? <span className="notification-counter">{count}</span> : null;

const mapStateToProps = state => ({
    isSmallDevice: state.isSmallDevice,
    member: state.member,
    notification: state.notification,
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
const SmallDeviceFooter = ({isScrollDown, isSmallDevice, member, notification}) => {
    let isLogin = member.cuid ? true : false;
    return (
        <FadeInOut inCondition={isSmallDevice && !isScrollDown} milliseconds={200}>
            <footer className="sm-device-footer u-padding-t-8 u-padding-b-8">
                <div className="container">
                    <ul className="row">
                        {
                            isLogin ?
                                menu.map((item, index) => (
                                    <li
                                        key={index}
                                        className="col-xs-3 u-text-center"
                                    >
                                        <Link to={item.linkTo} className="link">
                                            <Icon itemIcon={item.icon} />
                                            { 
                                                item.counter ? 
                                                <NotifyCounter count={notification.unSeenNotificationCount} /> : ''
                                            }
                                            <div className="font-size-12">{item.text}</div>
                                        </Link>
                                    </li>
                                ))
                            :
                                nonLoginMenu.map((item, index) => (
                                    <li
                                        key={index}
                                        className="col-xs-4 u-text-center"
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
            </footer>
        </FadeInOut>
    );
};

SmallDeviceFooter.propTypes = {
    isScrollDown: PropTypes.bool.isRequired,
    isSmallDevice: PropTypes.bool.isRequired,
    member: PropTypes.shape({
        cuid: PropTypes.string
    }),
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallDeviceFooter);