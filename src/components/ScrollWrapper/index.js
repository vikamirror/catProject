import React, { Component }  from 'react';
import PropTypes from 'prop-types';

let lastScroll = 0;

export default class ScrollWrapper extends Component {
    constructor () {
        super();
        this.scrollWrapperRef = null;
    }
    componentDidMount () {
        window.addEventListener("scroll", evt => this.handleScroll(evt));
        // 因為html, body的overflow: hidden, 因此能scroll的只有id=root跟id=app
        // 後來我把html, body的overflow: hidden拿掉了
        // document.getElementById(this.props.wrapperId).addEventListener("scroll", evt => this.handleScroll(evt));
    }
    componentWillUnmount () {
        window.removeEventListener("scroll", evt => this.handleScroll(evt));
        // document.getElementById(this.props.wrapperId).removeEventListener("scroll", evt => this.handleScroll(evt));
    }
    handleScroll (evt) {
        const scrollWrapper = this.scrollWrapperRef;
        // 取得scroll的位置
        // let currentScroll = document.getElementById(this.props.wrapperId).scrollTop || document.body.scrollTop;
        let currentScroll = Math.abs(scrollWrapper.offsetTop - window.scrollY);
        // let currentScroll = document.body.scrollTop;

        // console.log('currentScroll', currentScroll);
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
        return <div className="scroll-wrapper" ref={node => this.scrollWrapperRef = node}>{this.props.children}</div>;
    }
};

ScrollWrapper.propTypes = {
    scrollingHandler: PropTypes.func.isRequired,
    scrollDownHandler: PropTypes.func,
    // wrapperId: PropTypes.string.isRequired,
}
