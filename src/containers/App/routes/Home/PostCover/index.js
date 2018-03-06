import React from 'react';
import { Link } from 'react-router-dom';

import './postCover.css';

const ellipsisTextAfterMaxLength = (text, maxLength) => {
    return text.substring(0, maxLength-1) + '...';
}

export default function PostCover({image,title,introduction}) {
    return (
        <section className="postCover">
            <div className="album u-padding-b-16">
                <div className="imageBox">           
                    <img src={image} alt="" />
                </div>
            </div>
            <div className="avatar_title u-padding-l-16 u-padding-r-16">
                <div className="avatar">
                    <div className="imageBox">
                        <div className="imageBox__ratio">
                            <div className="image" style={{ backgroundImage: `url("./testImages/avatar.png")` }} />
                        </div>
                    </div>
                </div>
                <div className="title font-size-18 font-weight-5 u-mb-16">{title}</div>
            </div>
            <div className="introduceContent font-size-16 u-padding-l-16 u-padding-r-16">{ellipsisTextAfterMaxLength(introduction, 80)}</div>
            <hr className="hr-line-style1" />
            <div className="postCover-footer u-padding-l-16 u-padding-r-16 u-clearfix">
                <div className="more u-push-left">
                    <Link to="#">更多資訊</Link>
                </div>
                <div className="likes_messages icons u-push-right">
                    <Link to="#" className="icon-btn">
                        <i className="icon icon-heart-empty" />
                    </Link>
                    <Link to="#" className="icon-btn">
                        <i className="icon icon-comment" />
                    </Link>
                </div>
            </div>
        </section>
    );
}