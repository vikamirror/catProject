import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import { inputPost } from '../../../redux/post';

// const mapStateToProps = state => ({ post: state.post });
// const mapDispatchToProps = dispatch => (bindActionCreators({
//     inputPost: inputPost,
// }, dispatch));

class Story extends Component {
    setStory () {
        const htmlString = findDOMNode(this.refs.input_story).innerHTML;
        // console.log('htmlString',htmlString);
        const inputStory = htmlString.replace(/style="[^>]+/g, '');
        // console.log('inputStory',inputStory);
        this.props.handleState('story', inputStory);
    };
    render () {
        const {isEdit, story} = this.props;
        if (isEdit) {
            return (
                <div
                    ref="input_story"
                    className="textarea edit"
                    placeholder="寫下貓的故事......"
                    contentEditable="true"
                    dangerouslySetInnerHTML={{ __html:story }} 
                    onBlur={ () => this.setStory() }
                />
            );
        } else {
            return (
                <div
                    className="textarea"
                    contentEditable="false"
                    dangerouslySetInnerHTML={{ __html:story }}
                />
            );
        }
    }
};

Story.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    story: PropTypes.string.isRequired,
    handleState: PropTypes.func
};
export default Story;