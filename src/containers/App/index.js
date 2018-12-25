import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './Header';
import HeaderSmall from './HeaderSmall';
import SmallDeviceSearchHeader from './SearchHeader';
import GoBackHeader from './GoBackHeader';
import PostHeader from './PostHeader';
import SmallDeviceFooter from './SmallDeviceFooter';
// import Discover from './Discover';
import { fetchMember, onListenLastLogoutTime } from '../../redux/member';
import { logout } from '../../redux';
import { fetchPosts } from '../../redux/postList';
import { smallDeviceTrue, smallDeviceFalse } from '../../redux/isSmallDevice';
import Routes from './routes';
import Dialog from './Dialog';
import ScrollWrapper from '../../components/ScrollWrapper';
import Loading from './Loading';
import InitAnimation from './InitAnimation';
import * as sockets from '../../sockets/loginOrOut';

import './app.css';

const mapStateToProps = state => ({ 
    member: state.member,
    background: state.background,
    isSmallDevice: state.isSmallDevice,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    fetchMember: fetchMember,
    fetchPosts: fetchPosts,
    smallDeviceTrue: smallDeviceTrue,
    smallDeviceFalse: smallDeviceFalse,
    logout: logout,
    onListenLastLogoutTime: onListenLastLogoutTime,
},dispatch));

class App extends Component {
    constructor() {
        super();
        this.state = {
            isScroll: false,
            isScrollDown: false,
            initAppAnimation: true, 
        };
    }
    componentDidMount () { // localStorage只有在componentDidMount及componentWillUnmount才能抓到
        this.stopInitAnimation();
        this.props.fetchMember();
        // console.log('window.__PRELOADED_STATE__', window.__PRELOADED_STATE__);
        if (!window.__PRELOADED_STATE__) {
            const loadedIds = [];
            this.props.fetchPosts(loadedIds);
        };
        this.isSmallDevice();
        this.tologoutListener();
    }
    componentDidUpdate (prevProps, prevState) {
        // if (this.props.location.pathname !== prevProps.location.pathname) {
        //     this.setBackground(this.props.location.pathname);
        // }
        if (this.props.member.cuid && (prevProps.member.cuid !== this.props.member.cuid)) {
            this.notifyOtherDevicesToLogout(this.props.member.cuid);
            this.loginEmitter(this.props.member.cuid);
            this.props.onListenLastLogoutTime();
        }
    }
    notifyOtherDevicesToLogout (cuid) {
        sockets.logoutAllTheOtherDevicesEmitter(cuid);
    }
    loginEmitter (cuid) {
        sockets.loginEmitter(cuid);
    }
    tologoutListener () {
        const logoutHandler = () => {
            this.props.logout();
            this.props.history.push("/login");
        };
        sockets.logoutListener(logoutHandler);
    }
    isSmallDevice () {
        window.innerWidth < 768 ? this.props.smallDeviceTrue() : this.props.smallDeviceFalse();
    }
    handleScroll (isScroll) {
        isScroll ? this.setState({isScroll: true}) : this.setState({isScroll: false});
    }
    handleScrollDown (isScrollDown) {
        isScrollDown ? this.setState({isScrollDown: true}) : this.setState({isScrollDown: false});
    }
    stopInitAnimation () {
        setTimeout(() => {
            this.setState({initAppAnimation: false});
        }, 1000);
    }
    render() {
        const {background, isSmallDevice, location, member} = this.props;
        const {isScroll, isScrollDown, initAppAnimation} = this.state;
        return (
            <div id="app">
                <div id="app-bg" className={background}></div>
                {
                    isSmallDevice ?
                    <HeaderSmall shoudHeaderColored={isScroll} isScrollDown={isScrollDown} />
                    :
                    <Header shoudHeaderColored={isScroll} isScrollDown={isScrollDown} />
                }
                {/* <Discover /> */}
                <SmallDeviceSearchHeader />
                <GoBackHeader />
                <PostHeader shoudHeaderColored={isScroll} />
                <ScrollWrapper
                    wrapperId="app"
                    scrollingHandler={(isScroll) => this.handleScroll(isScroll)}
                    scrollDownHandler={(isScrollDown) => this.handleScrollDown(isScrollDown)}
                >
                    <Routes 
                        location={location}
                        member={member}
                    />
                </ScrollWrapper>
                { isSmallDevice ? <SmallDeviceFooter isScrollDown={isScrollDown} /> : '' }
                <Loading />
                <Dialog />
                <InitAnimation shouldStart={initAppAnimation} /> 
            </div>
        );
    }
}

App.proptypes = {
    member: PropTypes.object.isRequired,
    fetchMember: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);