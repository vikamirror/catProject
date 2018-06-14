import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    member: state.member
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
class MyAccount extends Component {
    render () {
        return (
            <div className="myAccount-wrapper">
                <div className="u-margin-header u-padding-b-40">
                    MyAccount
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);