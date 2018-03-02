import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from './Header';
import { fetchMember } from '../../redux/member';
import Routes from './routes';
import FullPageDialog from './FullPageDialog';

import './app.css';

const mapStateToProps = state => ({ 
    member: state.member,
    background: state.background,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    fetchMember: fetchMember
},dispatch));

class App extends Component {
    componentDidMount() { // localStorage只有在componentDidMount及componentWillUnmount才能抓到
        this.props.fetchMember();
    }
    render() {
        return (
            <div id="app">
                <div id="app_bg"></div>
                <Header />
                <Routes />
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