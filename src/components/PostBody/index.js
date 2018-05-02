import React from 'react';
import PropTypes from 'prop-types';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

import PostWrapper from '../../components/PostWrapper';
import DateAndAuthor from './DateAndAuthor';
import Title from './Title';
import Cover from './Cover';
// import Story from './Story';
import Charactor from './Charactor';
import CityAndDistrict from './CityAndDistrict';
import Age from './Age';
import Gender from './Gender';
import Spay from './Spay';
import Requirements from './Requirements';
import Contact from './Contact';
import Stream from './Stream';
import PostReply from '../PostReply';
// import { clearPost } from '../../redux/post';

// import * as postAPI from '../../fetch/postAPI';

import './postBody.css';

const PostBody = ({ isEdit, post, handleClose, handleState, handleSubmit }) => {
    return (
        <PostWrapper
            isEdit={isEdit}
            onClickClose={() => handleClose()}
            onClickSubmit={() => handleSubmit()}
        >  
            <Title 
                isEdit={isEdit} 
                title={post.title}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style2" />
            <DateAndAuthor 
                isEdit={isEdit}
                author={post.author}
                dateAdded={post.dateAdded}
                lastModify={post.lastModify} 
            />
            <Cover
                isEdit={isEdit} 
                cover={post.cover}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            {/* <Story 
                isEdit={isEdit} 
                story={post.story}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" /> */}
            <Charactor 
                isEdit={isEdit} 
                charactor={post.charactor}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            <CityAndDistrict
                isEdit={isEdit} 
                city={post.city}
                district={post.district}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            <Age 
                isEdit={isEdit} 
                age={post.age}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            <Gender
                isEdit={isEdit} 
                gender={post.gender}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            <Spay
                isEdit={isEdit} 
                isSpay={post.isSpay}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            <Requirements 
                isEdit={isEdit} 
                requirements={post.requirements}
                remark={post.remark}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            <Contact 
                isEdit={isEdit} 
                contact={post.contact}
                contactInfo={post.contactInfo}
                handleState={(item, value) => handleState(item, value)}
            />
            <hr className="hr-line-style1" />
            <Stream />
            {
                isEdit ? '' : 
                <PostReply 
                    postCuid={post.cuid}
                    postAuthor={post.author} 
                />
            }
        </PostWrapper>
    );
}

PostBody.propTypes = {
    isEdit: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleState: PropTypes.func,
    handleSubmit: PropTypes.func
};

export default PostBody;