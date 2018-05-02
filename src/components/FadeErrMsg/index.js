import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const defaultStyles = {
	transition: 'all 300ms ease-in',
	opacity: '0',
	height: '0',
    marginTop: '0',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
};

const transitionStyles = {
	entering: { height: '48px', opacity: '0', marginTop: '8px'},
	entered: { height: '48px', opacity: '1', marginTop: '8px'}, // Transition to component being visible and having its position reset. 
	exiting: { height: '48px', opacity: '0', marginTop: '8px'}, // Fade element out and slide it back up on exit.
};

const FadeErrMsg = ({inCondition, errorMsg}) => (
	<Transition in={inCondition} timeout={300}>
	{
		(status) => (
			<div style={{
                ...defaultStyles,
				...transitionStyles[status]}}
			>
				<p className="font-white" style={{lineHeight: "48px", margin: '0'}}>
                    {errorMsg}
                </p>
			</div>
		)
	}							
	</Transition>
);

FadeErrMsg.proptypes = {
	inCondition: PropTypes.bool.isRequired,
	errorMsg: PropTypes.string.isRequired,
}

export default FadeErrMsg;