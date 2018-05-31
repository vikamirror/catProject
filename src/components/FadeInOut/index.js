import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const defaultStyles = {
	// transition: 'all 300ms',
	display: 'none',
	opacity: '0'
};

const transitionStyles = {
    entering: {opacity: '0', display: 'block'}, // 正要進入的時候一定要先display: 'block', opacity才能從0到1
	entered: {opacity: '1', display: 'block'}, // Transition to component being visible and having its position reset. 
	exiting: {opacity: '0', display: 'block'}, // Fade element out and slide it back up on exit.
};

const FadeInOut = ({inCondition, milliseconds, children}) => (
    <Transition in={inCondition} timeout={{enter: milliseconds || 300, exit: milliseconds || 300}}>
    {
        (status) => (
            <div style={{
                ...defaultStyles,
                ...transitionStyles[status]}}
            >
                {children}
            </div>
        )
    }
    </Transition>
);

FadeInOut.proptypes = {
    inCondition: PropTypes.bool.isRequired,
    milliseconds: PropTypes.number,
}

export default FadeInOut;