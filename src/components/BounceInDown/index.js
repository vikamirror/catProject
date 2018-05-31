import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const BounceInDown = ({inCondition, enterMilliseconds, children}) => {
    const defaultStyles = {
        transition: `all ${enterMilliseconds}ms cubic-bezier(0.215, 0.610, 0.355, 1.000)`,
        opacity: '1',
        transform: 'translateY(0%)'
    };
    
    const transitionStyles = {
        entering: { opacity: '0', display: 'block', transform: 'translateY(-10%)'}, // 正要進入的時候一定要先display: 'block', opacity才能從0到1
        entered: { opacity: '1', display: 'block', transform: 'translateY(0%)'}, // Transition to component being visible and having its position reset. 
        // exiting: { opacity: '0', display: 'block', transform: 'translateY(10%)'}, // Fade element out and slide it back up on exit.
    };
    return (
        <Transition in={inCondition} timeout={{enter: enterMilliseconds || 300, exit: 300}}>
        {
            (status) => (
                <div style={{
                    ...defaultStyles,
                    ...transitionStyles[status]}}
                    className="bounceInDown-wrapper"
                >
                    {children}
                </div>
            )
        }							
        </Transition>
    );
};

BounceInDown.proptypes = {
	inCondition: PropTypes.bool.isRequired,
	enterMilliseconds: PropTypes.number,
}

export default BounceInDown;