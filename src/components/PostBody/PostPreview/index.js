import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Title from '../Title';
import Cover from '../Cover';
import DateAndAuthor from '../DateAndAuthor';
import Charactor from '../Charactor';

import './postPreview.css';

const PostPreview = ({post, currentPath}) => {
    return (
        <div className="mypost postWrapper">
            <Title 
                title={post.title}
                isEdit={false}
            />
            <hr className="hr-line-style1" />
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
                <Link
                    to={{
                        pathname: `${currentPath}/${post.cuid}`,
                        state: {
                            isShowPostModal: true,
                            modalPath: `${currentPath}`
                        },
                    }}
                    className="link font-lightGrey"
                >
                    檢視更多
                </Link>
            </div>
        </div>
    );
};
PostPreview.propTypes = {
    post: PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.object.isRequired,
        dateAdded: PropTypes.string.isRequired,
        lastModify: PropTypes.string.isRequired,
        cover: PropTypes.string.isRequired,
        charactor: PropTypes.string.isRequired,
        cuid: PropTypes.string.isRequired,
    })
};

export default PostPreview;