import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
import Edit from '../../../../../components/PostBody/Edit';
import PostReply from '../../../../../components/PostReply';

import '../../../../../components/PostBody/postBody.css';

const mapStateToProps = state => ({ });
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
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
            isFetched: false, // 是否拿到後端的post了, 是true的話PostWrapper才會顯示
            isEdit: false, // 是否是編輯模式
        };
        this.postBeforeEdit = {};
    }
    componentDidMount () {
        this.fetchOnePost();
    }
    fetchOnePost () {
        postAPI
            .getOnePost(this.props.match.params.cuid)
            .then((res) => {
                if (res.status === 200) {
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
                        requirements: [...res.data.post.requirements],
                        remark: res.data.post.remark,
                        contact: res.data.post.contact,
                        contactInfo: res.data.post.contactInfo,
                        dateAdded: res.data.post.dateAdded,
                        lastModify: res.data.post.lastModify,
                        author: {
                            ...this.state.author,
                            name: res.data.post.author.name,
                            avatar: res.data.post.author.avatar,
                            cuid: res.data.post.author.cuid
                        }
                    });
                    this.setState({isFetched: true});
                }
            })
            .catch(err => console.error(err.message));
    }
    handleClose () {
        if (!this.state.isEdit) {
            this.props.history.goBack();
        } else {
            this.setState({isEdit: false});
            this.setState({
                title: this.postBeforeEdit.title,
                cover: this.postBeforeEdit.cover,
                story: this.postBeforeEdit.story,
                charactor: this.postBeforeEdit.charactor,
                city: this.postBeforeEdit.city,
                district: this.postBeforeEdit.district,
                age: this.postBeforeEdit.age,
                gender: this.postBeforeEdit.gender,
                isSpay: this.postBeforeEdit.isSpay,
                requirements: [...this.postBeforeEdit.requirements],
                remark: this.postBeforeEdit.remark,
                contact: this.postBeforeEdit.contact,
                contactInfo: this.postBeforeEdit.contactInfo
            });
        }
    }
    handleEdit () {
        this.setState({isEdit: true});
        this.savePostBeforeEdit();
    }
    savePostBeforeEdit () {
        this.postBeforeEdit = {
            title: this.state.title,
            cover: this.state.cover,
            story: this.state.story,
            charactor: this.state.charactor,
            city: this.state.city,
            district: this.state.district,
            age: this.state.age,
            gender: this.state.gender,
            isSpay: this.state.isSpay,
            requirements: this.state.requirements.slice(0),
            remark: this.state.remark,
            contact: this.state.contact,
            contactInfo: this.state.contactInfo
        };
    }
    handleState (item, value) {
        // console.log('item:',item, 'value:',value);
        this.setState({[item]: value});
    }
    handleUpdate () {
        const updatedPost = {
            title: this.state.title,
            cover: this.state.cover,
            story: this.state.story,
            charactor: this.state.charactor,
            city: this.state.city,
            district: this.state.district,
            age: this.state.age,
            gender: this.state.gender,
            isSpay: this.state.isSpay,
            requirements: this.state.requirements,
            remark: this.state.remark,
            contact: this.state.contact,
            contactInfo: this.state.contactInfo
        }
        this.setState({isEdit: false});
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>{this.state.title}</title>
                </Helmet>
                <article>
                    <PostWrapper
                        isEdit={this.state.isEdit}
                        isFetched={this.state.isFetched}
                        onClickClose={() => this.handleClose()}
                    >
                        <Title 
                            isEdit={this.state.isEdit} 
                            title={this.state.title}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style2" />
                        <DateAndAuthor 
                            isEdit={this.state.isEdit}
                            author={this.state.author}
                            dateAdded={this.state.dateAdded}
                            lastModify={this.state.lastModify} 
                        />
                        <Cover
                            isEdit={this.state.isEdit} 
                            cover={this.state.cover}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        <Charactor 
                            isEdit={this.state.isEdit}
                            charactor={this.state.charactor}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        <CityAndDistrict
                            isEdit={this.state.isEdit} 
                            city={this.state.city}
                            district={this.state.district}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        <Age 
                            isEdit={this.state.isEdit} 
                            age={this.state.age}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        <Gender
                            isEdit={this.state.isEdit} 
                            gender={this.state.gender}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        <Spay
                            isEdit={this.state.isEdit} 
                            isSpay={this.state.isSpay}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        <Requirements 
                            isEdit={this.state.isEdit} 
                            requirements={this.state.requirements}
                            remark={this.state.remark}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        <Contact 
                            isEdit={this.state.isEdit} 
                            contact={this.state.contact}
                            contactInfo={this.state.contactInfo}
                            handleState={(item, value) => this.handleState(item, value)}
                        />
                        <hr className="hr-line-style1" />
                        {
                            this.state.isEdit ? 
                            ''
                            :
                            <div>
                                <Stream
                                    author={this.state.author}
                                    postCuid={this.state.cuid}
                                />
                                <Edit
                                    author={this.state.author}
                                    handleEdit={() => this.handleEdit()}
                                />
                            </div>
                        }
                        <PostReply
                            postCuid={this.state.cuid}
                            postAuthor={this.state.author} 
                        />
                    </PostWrapper>
                </article>
            </div>
        );
    }
}5
export default connect(mapStateToProps, mapDispatchToProps)(Post);