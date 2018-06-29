import { Component }  from 'react';
import PropTypes from 'prop-types';

let lastScroll = 0;

export default class ScrollWrapper extends Component {
    componentDidMount () {
        if (this.props.scrollingHandler && this.props.wrapperId) {
            // window.addEventListener("scroll", evt => this.handleScroll(evt));
            // 因為html, body的overflow: hidden, 因此能scroll的只有id=root跟id=app
            document.getElementById(this.props.wrapperId).addEventListener("scroll", evt => this.handleScroll(evt));
        }
    }
    componentWillUnmount () {
        if (this.props.scrollingHandler && this.props.wrapperId) {
            // window.removeEventListener("scroll", evt => this.handleScroll(evt));
            document.getElementById(this.props.wrapperId).removeEventListener("scroll", evt => this.handleScroll(evt));
        }
    }
    handleScroll (evt) {
        // 取得scroll的位置
        let currentScroll = document.getElementById(this.props.wrapperId).scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
            this.props.scrollingHandler(true)
        } else {
            this.props.scrollingHandler(false);
        };
        
        if (this.props.scrollDownHandler) {
            if (currentScroll > 0 && lastScroll <= currentScroll) {
                // "Scrolling DOWN"
                lastScroll = currentScroll;
                this.props.scrollDownHandler(true);
            } else {
                // "Scrolling UP"
                lastScroll = currentScroll;
                this.props.scrollDownHandler(false);
            }
        };
    }
    render () {
        return this.props.children;
    }
};

ScrollWrapper.propTypes = {
    scrollingHandler: PropTypes.func.isRequired,
    scrollDownHandler: PropTypes.func,
    wrapperId: PropTypes.string.isRequired,
}
