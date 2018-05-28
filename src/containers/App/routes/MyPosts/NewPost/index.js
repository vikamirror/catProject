import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import PostBody from '../../../../../components/PostBody';
import * as postAPI from '../../../../../fetch/postAPI';
import * as sockets from '../../../../../sockets/post';
// import { addNewPostOfMine } from '../../../../../redux/myPosts';

import { createEmptyPost } from '../../../../../redux/post';
import { addMyPost } from '../../../../../redux/myPosts';
import { addPostList } from '../../../../../redux/postList';
import PostWrapper from '../../../../../components/PostWrapper';
import Title from '../../../../../components/PostBody/Title';
// import DateAndAuthor from '../../../../../components/PostBody/DateAndAuthor';
import Cover from '../../../../../components/PostBody/Cover';
import Charactor from '../../../../../components/PostBody/Charactor';
import CityAndDistrict from '../../../../../components/PostBody/CityAndDistrict';
import Age from '../../../../../components/PostBody/Age';
import Gender from '../../../../../components/PostBody/Gender';
import Spay from '../../../../../components/PostBody/Spay';
import Requirements from '../../../../../components/PostBody/Requirements';
import Contact from '../../../../../components/PostBody/Contact';

import '../../../../../components/PostBody/postBody.css';

const mapStateToProps = state => ({ 
    member: state.member,
    post: state.post,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    createEmptyPost: createEmptyPost,
    addMyPost: addMyPost,
    addPostList: addPostList,
}, dispatch));
class NewPost extends Component {
    componentDidMount () {
        if (this.props.member.name) {
            this.props.createEmptyPost(this.props.member);
        } else {
            this.props.history.push("/");
        }
    }
    handleSubmit () {
        const newPost = {
            title: this.props.post.title,
            cover: this.props.post.cover,
            story: this.props.post.story,
            charactor: this.props.post.charactor,
            city: this.props.post.city,
            district: this.props.post.district,
            age: this.props.post.age,
            gender: this.props.post.gender,
            isSpay: this.props.post.isSpay,
            requirements: this.props.post.requirements,
            remark: this.props.post.remark,
            contact: this.props.post.contact,
            contactInfo: this.props.post.contactInfo,
            author: this.props.post.author
        };
        postAPI
            .createPost(newPost)
            .then((res) => {
                if (res.status === 200) {
                    const addedPost = res.data.post;
                    this.props.addMyPost(addedPost);
                    this.props.addPostList(addedPost);
                    sockets.addPostListBroadcastEmitter(addedPost);
                }
            })
            .catch(err => console.error(err.response.data));

        this.props.history.push("/myPosts");
    }
    render () {
        const {
            isEdit,
            title,
            cover,
            charactor,
            city,
            district,
            age,
            gender,
            isSpay,
            requirements,
            remark,
            contact,
            contactInfo
        } = this.props.post;
        return (
            <PostWrapper onClickSubmit={() => this.handleSubmit()}>
                <Title 
                    isEdit={isEdit} 
                    title={title}
                />
                <hr className="hr-line-style2" />
                <Cover
                    isEdit={isEdit} 
                    cover={cover}
                />
                <hr className="hr-line-style1" />
                <Charactor
                    isEdit={isEdit} 
                    charactor={charactor}
                    placeholder="貓咪的故事......"
                />
                <hr className="hr-line-style1" />
                <CityAndDistrict
                    isEdit={isEdit} 
                    city={city}
                    district={district}
                />
                <hr className="hr-line-style1" />
                <Age 
                    isEdit={isEdit} 
                    age={age}
                />
                <hr className="hr-line-style1" />
                <Gender
                    isEdit={isEdit} 
                    gender={gender}
                />
                <hr className="hr-line-style1" />
                <Spay
                    isEdit={isEdit} 
                    isSpay={isSpay}
                />
                <hr className="hr-line-style1" />
                <Requirements 
                    isEdit={isEdit} 
                    requirements={requirements}
                    remark={remark}
                />
                <hr className="hr-line-style1" />
                <Contact 
                    isEdit={isEdit} 
                    contact={contact}
                    contactInfo={contactInfo}
                />
            </PostWrapper>
        );
    }
}

NewPost.propTypes = {
    post: PropTypes.shape({
        isEdit: PropTypes.bool.isRequired,
        title: PropTypes.string,
        cover: PropTypes.string,
        charactor: PropTypes.any,
        city: PropTypes.string,
        district: PropTypes.string,
        age: PropTypes.string,
        gender: PropTypes.string,
        isSpay: PropTypes.bool,
        requirements: PropTypes.array,
        remark: PropTypes.string,
        contact: PropTypes.string,
        contactInfo: PropTypes.string
    }),
    member: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }),
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
