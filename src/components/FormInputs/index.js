import React from 'react';
import PropTypes from 'prop-types';

import './pure_css_checkbox.css';
import './formInputs.css';

export const CheckBox = ({id, name, isChecked, label, onChangeHandler}) => (
    <div className="pure-checkbox checkbox">
        <input 
            type="checkbox"
            id={id}
            name={name}
            checked={isChecked}
            onChange={() => onChangeHandler(!isChecked)}
        />
        <label htmlFor={id}>{label}</label>
    </div>
);

export const RadioButton = ({id, name, value, isChecked, label, onChangeHandler}) => {
    return (
        <div className="pure-radiobutton radio-button">
            <input
                type="radio" className="radio"
                id={id}
                name={name}
                value={value}
                checked={isChecked}
                onChange={(evt) => onChangeHandler(evt)} 
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};

export const TextArea = ({placeholder}) => (
    <div 
        ref="div_charactor"
        className="div-textarea"
        placeholder={placeholder}
        contentEditable="true"
        dangerouslySetInnerHTML={{ __html:''}} 
    />
);
TextArea.propTypes = {
    placeholder: PropTypes.string.isRequired
}

