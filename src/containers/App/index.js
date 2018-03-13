import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './Header';
import { fetchMember } from '../../redux/member';
import { smallDeviceTrue, smallDeviceFalse } from '../../redux/isSmallDevice';
import Routes from './routes';
import FullPageDialog from './FullPageDialog';
import ScrollWrapper from '../../components/ScrollWrapper';

import './app.css';

const mapStateToProps = state => ({ 
    member: state.member,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    fetchMember: fetchMember,
    smallDeviceTrue: smallDeviceTrue,
    smallDeviceFalse: smallDeviceFalse,
},dispatch));

class App extends Component {
    constructor() {
        super();
        this.state = {
            isScroll: false
        }
    }
    componentDidMount () { // localStorage只有在componentDidMount及componentWillUnmount才能抓到
        this.props.fetchMember();
        this.isSmallDevice();
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
                <div id="app_bg"></div>
                <Header shoudHeaderColored={this.state.isScroll} />
                <ScrollWrapper onWindowScroll={(isScroll) => this.handleScroll(isScroll)}>
                    <Routes />
                </ScrollWrapper>
                <FullPageDialog />
            </div>
        );
    }
}

App.proptypes = {
    member: PropTypes.object.isRequired,
    fetchMember: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);