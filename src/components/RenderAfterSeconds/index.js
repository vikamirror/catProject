import {Component} from 'react';
import PropTypes from 'prop-types';

export default class RenderAfterSeconds extends Component{
    constructor() {
        super();
        this.state = {
            show: false,
        }
        this.timerHandle = null;
    }
    componentDidMount() {
        // 把Timer存成一個變數
        this.timerHandle = setTimeout(() => {
            this.setState({show: true});
            // this.timerHandle = null;
        }, this.props.milliseconds);
    }
    componentWillUnmount() {
        if (this.timerHandle) { // 生命週期是一直在變動的, 如果timer在Unmount時仍啟動著, 要移除
            clearTimeout(this.timerHandle);
            this.timerHandle = null;
        }
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