import React, {Component} from 'react';
import PropTypes from 'prop-types';

class OnBlurListener extends Component {
    onBlurComponent (e) {
        let currentTarget = e.currentTarget;
        setTimeout(() => {
            if (! currentTarget.contains(document.activeElement)) {
                this.props.inactiveFocus();
                // console.log('離開component');
            }
        }, 0);
    }
    render () {
        const {activeFocus, children, className} = this.props;
        return (
            <div className={`u-div-outline-0 ${className || ''}`}
                 tabIndex="1"
                 onClick={() => activeFocus()}
                 onBlur={e => this.onBlurComponent(e)}>
                 { children }
            </div>
        );
    }
}

OnBlurListener.propTypes = {
    activeFocus: PropTypes.func.isRequired,
    inactiveFocus: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default OnBlurListener;