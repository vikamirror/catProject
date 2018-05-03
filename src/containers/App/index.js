import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './Header';
import { fetchMember } from '../../redux/member';
import { fetchPosts } from '../../redux/postList';
import { smallDeviceTrue, smallDeviceFalse } from '../../redux/isSmallDevice';
import Routes from './routes';
// import FullPageDialog from './FullPageDialog';
import Dialog from './Dialog';
import ScrollWrapper from '../../components/ScrollWrapper';
import Loading from './Loading';

import './app.css';

const mapStateToProps = state => ({ 
    member: state.member,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    fetchMember: fetchMember,
    fetchPosts: fetchPosts,
    smallDeviceTrue: smallDeviceTrue,
    smallDeviceFalse: smallDeviceFalse,
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
        this.props.fetchPosts();
        this.isSmallDevice();
    }
    componentWillReceiveProps (nextProps) {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            this.setBackground(nextProps.location.pathname);
        }
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
                <ScrollWrapper onWindowScroll={(isScroll) => this.handleScroll(isScroll)}>
                    <Routes />
                </ScrollWrapper>
                <Loading />
                <Dialog />
                {/* <FullPageDialog /> */}
            </div>
        );
    }
}

App.proptypes = {
    member: PropTypes.object.isRequired,
    fetchMember: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);