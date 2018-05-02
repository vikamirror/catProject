import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';

// import { fetchOnePost } from '../../../../../redux/post';
import * as postAPI from '../../../../../fetch/postAPI';
// import PostBody from '../../../../../components/PostBody';
import PostWrapper from '../../../../../components/PostWrapper';
import Title from '../../../../../components/PostBody/Title';
import DateAndAuthor from '../../../../../components/PostBody/DateAndAuthor';
import Cover from '../../../../../components/PostBody/Cover';
import Charactor from '../../../../../components/PostBody/Charactor';
import CityAndDistrict from '../../../../../components/PostBody/CityAndDistrict';
import Age from '../../../../../components/PostBody/Age';
import Gender from '../../../../../components/PostBody/Gender';
import Spay from '../../../../../components/PostBody/Spay';
import Requirements from '../../../../../components/PostBody/Requirements';
import Contact from '../../../../../components/PostBody/Contact';
import Stream from '../../../../../components/PostBody/Stream';
import PostReply from '../../../../../components/PostReply';

import '../../../../../components/PostBody/postBody.css';

class Post extends Component {
    constructor () {
        super();
        this.state = {
            cuid: '',
            title: '',
            cover: '',
            story: '',
            charactor: '',
            city: '台北市',
            district: '松山區',
            age: '',
            gender: '0',
            isSpay: false,
            requirements: [],
            remark: '',
            contact: '',
            contactInfo: '',
            dateAdded: new Date().toISOString(), // mongoDB預設輸出的字串為ISOString
            lastModify: new Date().toISOString(),
            author: {
                name: '',
                avatar: '',
                cuid: ''
            },
            isFetched: false,
        };
    }
    componentDidMount () {
        this.fetchOnePost();
    }
    fetchOnePost () {
        postAPI
            .getOnePost(this.props.match.params.cuid)
            .then((res) => {
                if (res.status === 200) {
                    const copiedRequirements = [...res.data.post.requirements];
                    const copiedAuthor = {
                        ...this.state.author,
                        name: res.data.post.author.name,
                        avatar: res.data.post.author.avatar,
                        cuid: res.data.post.author.cuid
                    };
                    this.setState({
                        cuid: res.data.post.cuid,
                        title: res.data.post.title,
                        cover: res.data.post.cover,
                        story: res.data.post.story,
                        charactor: res.data.post.charactor,
                        city: res.data.post.city,
                        district: res.data.post.district,
                        age: res.data.post.age,
                        gender: res.data.post.gender,
                        isSpay: res.data.post.isSpay,
                        requirements: copiedRequirements,
                        remark: res.data.post.remark,
                        contact: res.data.post.contact,
                        contactInfo: res.data.post.contactInfo,
                        dateAdded: res.data.post.dateAdded,
                        lastModify: res.data.post.lastModify,
                        author: copiedAuthor
                    });
                    this.setState({isFetched: true});
                }
            })
            .catch(err => console.error(err.message));
    }
    handleClose () {
        this.props.history.goBack();
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>
                <article>
                    <PostWrapper
                        isEdit={false}
                        isFetched={this.state.isFetched}
                        onClickClose={() => this.handleClose()}
                    >
                        <Title 
                            isEdit={false} 
                            title={this.state.title}
                        />
                        <hr className="hr-line-style2" />
                        <DateAndAuthor 
                            isEdit={false}
                            author={this.state.author}
                            dateAdded={this.state.dateAdded}
                            lastModify={this.state.lastModify} 
                        />
                        <Cover
                            isEdit={false} 
                            cover={this.state.cover}
                        />
                        <hr className="hr-line-style1" />
                        <Charactor 
                            isEdit={false} 
                            charactor={this.state.charactor}
                        />
                        <hr className="hr-line-style1" />
                        <CityAndDistrict
                            isEdit={false} 
                            city={this.state.city}
                            district={this.state.district}
                        />
                        <hr className="hr-line-style1" />
                        <Age 
                            isEdit={false} 
                            age={this.state.age}
                        />
                        <hr className="hr-line-style1" />
                        <Gender
                            isEdit={false} 
                            gender={this.state.gender}
                        />
                        <hr className="hr-line-style1" />
                        <Spay
                            isEdit={false} 
                            isSpay={this.state.isSpay}
                        />
                        <hr className="hr-line-style1" />
                        <Requirements 
                            isEdit={false} 
                            requirements={this.state.requirements}
                            remark={this.state.remark}
                        />
                        <hr className="hr-line-style1" />
                        <Contact 
                            isEdit={false} 
                            contact={this.state.contact}
                            contactInfo={this.state.contactInfo}
                        />
                        <hr className="hr-line-style1" />
                        <Stream
                            postCuid={this.state.cuid}
                        />
                        <PostReply
                            postCuid={this.state.cuid}
                            postAuthor={this.state.author} 
                        />
                    </PostWrapper>
                </article>
            </div>
        );
    }
}
Post.propTypes = {
    handleClose: PropTypes.func.isRequired,
};

export default Post;