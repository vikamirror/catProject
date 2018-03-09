import {Component} from 'react';
import PropTypes from 'prop-types';

export default class RenderAfterSeconds extends Component{
    constructor() {
        super();
        this.state = {
            show: false,
        }
    }
    componentDidMount() {
        const { milliseconds } = this.props;
        setTimeout(() => {
            this.setState({show: true});
        }, milliseconds);
    }
    render() {
        if (!this.state.show) {
            return '';
        } else {
            return this.props.children;
        }
    }
}

RenderAfterSeconds.propTypes = {
    milliseconds: PropTypes.number.isRequired
};