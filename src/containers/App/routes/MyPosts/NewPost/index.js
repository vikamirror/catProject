import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// import PostBody from '../../../../../components/PostBody';
// import * as postAPI from '../../../../../fetch/postAPI';
// import { addNewPostOfMine } from '../../../../../redux/myPosts';

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

import '../../../../../components/PostBody/postBody.css';

const mapStateToProps = state => ({ 
    member: state.member,
    myPosts: state.myPosts
});
const mapDispatchToProps = dispatch => (bindActionCreators({}, dispatch));
class NewPost extends Component {
    constructor () {
        super();
        this.state = {
            title: '',
            cover: '',
            story: '',
            charactor: '',
            city: '台北市',
            district: '松山區',
            age: '',
            gender: '0',
            isSpay: false,
            requirements: [
                {name:'isAdult', desc:'須年滿20歲', value:false},
                {name:'housemateAgreement', desc:'須經家人或室友同意' ,value:false},
                {name:'financiallyIndependent', desc: '須具備經濟能力，包括每年施打預防針、貓咪生病時的醫藥費負擔', value:false},
                {name:'newHandFriendly', desc: '不排斥養貓新手，但須有正確的飼養觀念', value:false},
                {name:'noAbuse', desc: '不可關籠以及鏈貓，不可有任何虐待貓咪的行為', value:false},
                {name:'noWildRelease', desc: '不能以『野放』的方式養貓，不可讓貓咪單獨外出，外出時請將貓裝入外出籠以保安全', value:false},
                {name:'noticeOfSpay', desc: '須有結紮觀念', value:false},
                {name:'accommodationPeriod', desc: '須同意一週的試養期，若貓咪無法適應，請交還原主', value:false},
                {name:'regularReview', desc: '須接受定期追蹤', value:false},
                {name:'letterOfGuarantee', desc: '須同意簽認養切結書', value:false}
            ],
            remark: '',
            contact: '',
            contactInfo: '',
            author: {
                name: '',
                avatar: '',
                cuid: ''
            },
        };
    }
    componentDidMount () {
        if (this.props.member.name) {
            this.updateMember(this.props.member);
        }
    }
    handleState (item, value) {
        // console.log('item:',item, 'value:',value);
        this.setState({[item]: value});
    }
    updateMember (member) {
        const updatedAuthor = {
            ...this.state.author,
            name: member.name,
            avatar: member.avatar,
            cuid: member.cuid
        };
        this.setState({author: updatedAuthor});
        this.setState({})
    }
    handleSubmit () {
        const newPost = {
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
            contactInfo: this.state.contactInfo,
            author: this.state.author
        }
        this.props.addOnePost(newPost);
        this.props.handleClose();
    }
    render () {
        return (
            <PostWrapper
                isEdit={true}
                isFetched={true}
                onClickClose={() => this.props.handleClose()}
                onClickSubmit={() => this.handleSubmit()}
            >
                <Title 
                    isEdit={true} 
                    title={this.state.title}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style2" />
                <DateAndAuthor 
                    isEdit={true}
                    author={this.state.author}
                    dateAdded={this.state.dateAdded}
                    lastModify={this.state.lastModify} 
                />
                <Cover
                    isEdit={true} 
                    cover={this.state.cover}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style1" />
                <Charactor 
                    isEdit={true} 
                    charactor={this.state.charactor}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style1" />
                <CityAndDistrict
                    isEdit={true} 
                    city={this.state.city}
                    district={this.state.district}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style1" />
                <Age 
                    isEdit={true} 
                    age={this.state.age}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style1" />
                <Gender
                    isEdit={true} 
                    gender={this.state.gender}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style1" />
                <Spay
                    isEdit={true} 
                    isSpay={this.state.isSpay}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style1" />
                <Requirements 
                    isEdit={true} 
                    requirements={this.state.requirements}
                    remark={this.state.remark}
                    handleState={(item, value) => this.handleState(item, value)}
                />
                <hr className="hr-line-style1" />
                <Contact 
                    isEdit={true} 
                    contact={this.state.contact}
                    contactInfo={this.state.contactInfo}
                    handleState={(item, value) => this.handleState(item, value)}
                />
            </PostWrapper>
        );
    }
}

NewPost.propTypes = {
    member: PropTypes.object.isRequired,
    addOnePost: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);
