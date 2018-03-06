import React from 'react';

import './postHeader.css';

export default function PostHeader() {
    return (
        <header className="postHeader">
            <div className="title">標題很長很長很長很長很長很長很長很長很長很長很長很長</div>
            <div className="authorInfo u-clearfix ">
                <div className="avatar">
                    <div className="imageBox">
                        <div className="imageBox__ratio">
                            <div className="image" style={{ backgroundImage: `url("./testImages/avatar.png")` }} />
                        </div>
                    </div>
                </div>
                <div className="">帳號</div>
            </div>
            
        </header>
    );
}