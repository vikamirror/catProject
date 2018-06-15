import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './Header';
import { fetchMember, logout } from '../../redux/member';
import { fetchPosts } from '../../redux/postList';
import { smallDeviceTrue, smallDeviceFalse } from '../../redux/isSmallDevice';
import Routes from './routes';
import Dialog from './Dialog';
import ScrollWrapper from '../../components/ScrollWrapper';
import Loading from './Loading';
import * as sockets from '../../sockets/loginOrOut';

import './app.css';

const mapStateToProps = state => ({ 
    member: state.member,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    fetchMember: fetchMember,
    fetchPosts: fetchPosts,
    smallDeviceTrue: smallDeviceTrue,
    smallDeviceFalse: smallDeviceFalse,
    logout: logout,
},dispatch));

class App extends Component {
    constructor() {
        super();
        this.state = {
            isScroll: false,
            backgroundClass: 'bg_home'
        }
    }
    componentDidMount () { // localStorage只有在componentDidMount及componentWillUnmount才能抓到
        this.props.fetchMember();
        // console.log('window.__PRELOADED_STATE__', window.__PRELOADED_STATE__);
        if (!window.__PRELOADED_STATE__) {
            this.props.fetchPosts();
        }
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
            this.props.history.push('/');
        };
        sockets.logoutListener(logoutHandler);
    }
    setBackground (pathname) {
        switch (pathname) {
            case '/':
                this.setState({backgroundClass: 'bg_home'});
                break;
            case '/myPosts':
                this.setState({backgroundClass: 'bg_myPosts'});
                break;
            case '/login':
                this.setState({backgroundClass: 'bg_login'});
                break;
            case '/register':
                this.setState({backgroundClass: 'bg_register'});
                break;
            default:
                break;
        }
    }
    isSmallDevice () {
        window.innerWidth < 768 ? this.props.smallDeviceTrue() : this.props.smallDeviceFalse();
    }
    handleScroll (isScroll) {
        isScroll ? this.setState({isScroll: true}) : this.setState({isScroll: false});
    }
    render() {
        return (
            <div id="app">
                <div id="app_bg" className={this.state.backgroundClass}></div>
                <Header shoudHeaderColored={this.state.isScroll} />
                <ScrollWrapper onWindowScroll={(isScroll) => this.handleScroll(isScroll)} wrapperId="app">
                    <Routes location={this.props.location} />
                </ScrollWrapper>
                <Loading />
                <Dialog />
            </div>
        );
    }
}

App.proptypes = {
    member: PropTypes.object.isRequired,
    fetchMember: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);