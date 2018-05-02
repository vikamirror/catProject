import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import TextAreaWithImage from '../../FormInputs/TextAreaWithImage';
// import { inputPost } from '../../../redux/post';

const Charactor = ({isEdit, charactor, handleState}) => {
    const setCharactor = (content) => {
        // const newPost = {
        //     ...post,
        //     charactor: content //只更新charactor的部分
        // };
        // inputPost(newPost);
        handleState('charactor', content);
    };
    if (isEdit) {
        return <TextAreaWithImage 
                    label="性格、健康狀況圖文詳述" 
                    placeholder="咪咪是一隻很乖巧懂事的貓咪,個性穩定,不太會搗蛋......"
                    defaultContent={charactor}
                    setContentHandler={(content) => setCharactor(content)} 
                />;
    } else {
        return <div className="textarea edit"
                    contentEditable="false"
                    dangerouslySetInnerHTML={{ __html: charactor }} 
                />;
    }
};

Charactor.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    charactor: PropTypes.string.isRequired,
    handleState: PropTypes.func
};
export default Charactor;