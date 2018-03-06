import { Component }  from 'react';
import PropTypes from 'prop-types';

export default class ScrollWrapper extends Component {
    componentDidMount () {
        if (this.props.onWindowScroll) {
            window.addEventListener("scroll", evt => this.handleScroll(evt));
        }
    }
    componentWillUnmount () {
        if (this.props.onWindowScroll) {
            window.removeEventListener("scroll", evt => this.handleScroll(evt));
        }
    }
    handleScroll (evt) {
        // Do something generic, if you have to
        if(document.body.scrollTop > 0 || document.documentElement.scrollTop > 0){
            // Call the passed-in prop
            this.props.onWindowScroll(true);
        } else {
            this.props.onWindowScroll(false);
        }
    }
    render () {
        return this.props.children;
    }
};

ScrollWrapper.propTypes = {
    onWindowScroll: PropTypes.func.isRequired,
}
