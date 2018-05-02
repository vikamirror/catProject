import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from '../Title';
import Cover from '../Cover';
import DateAndAuthor from '../DateAndAuthor';
import Charactor from '../Charactor';

import './postPreview.css';

const PostPreview = ({post}) => {
    return (
        <div className="mypost postWrapper">
            <Title 
                isEdit={false} 
                title={post.title}
            />
            <hr className="hr-line-style2" />
            <DateAndAuthor 
                isEdit={false}
                author={post.author}
                dateAdded={post.dateAdded}
                lastModify={post.lastModify} 
            /> 
            <Cover
                isEdit={false} 
                cover={post.cover}
            />
            <hr className="hr-line-style1" />
            <div className="charactor-max-height">
                <Charactor 
                    isEdit={false} 
                    charactor={post.charactor}
                />
            </div>
            <div className="clickPost">
                <Link to={`/post/${post.cuid}`} className="font-lightGrey">檢視更多</Link>
            </div>           
        </div>
    );
};

export default PostPreview;