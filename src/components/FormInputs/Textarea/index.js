import React, { Component } from 'react';

export default class Textarea extends Component {
    constructor () {
        super();
        this.state = {
            inputValue: ''
        };
    }
    onChangeInput (evt) {
        this.setState({inputValue: evt.target.value});
    }
    render () {
        return (
            <textarea 
                className="textarea"
                value={this.state.inputValue}
                onChange={(evt) => this.onChangeInput(evt)}>
            </textarea>
        );
    }
}