import React from 'react';

import 'react-quill/dist/quill.snow.css';
import './quillEditorStyle.css';

let ReactQuill;
if (typeof window !== 'undefined') {
    ReactQuill = require('react-quill');
}

const QuillEditorReadOnly = ({content, placeholder}) => {
    const readOnlyModule = {toolbar: false};
    if (typeof window !== 'undefined' && ReactQuill) {
        return (
            <div className="editor_wrapper_readOnly">
                <ReactQuill
                    theme="snow"
                    value={content}
                    placeholder={placeholder}
                    modules={readOnlyModule}
                    readOnly={true}
                />
            </div>
        );
    } else {
        return <textarea />;
    }
};

export default QuillEditorReadOnly;