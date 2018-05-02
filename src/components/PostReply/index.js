import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import LeaveMsg from './LeaveMsg';
import Message from './Message';
import { showDialog, closeDialog } from '../../redux/dialog';
import * as messageAPI from '../../fetch/messageAPI';

import './postReply.css';

const mapStateToProps = state => ({ 
    dialog: state.dialog,
    member: state.member,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    showDialog: showDialog,
    closeDialog: closeDialog,
}, dispatch));
class PostReply extends Component {
    constructor() {
        super();
        this.state = {
            tag: '',
            messages: [],
            orderByAscend: true
        };
    }
    // componentWillReceiveProps (nextProps) {
    //     if (nextProps.postCuid && (nextProps.postCuid !== this.props.postCuid)) {
    //         this.fetchMessages(nextProps.postCuid);
    //     }
    // }
    componentDidMount () {
        if (this.props.postCuid) {
            this.fetchMessages(this.props.postCuid);
        }
    }
    fetchMessages (postCuid) {
        messageAPI
            .getMessages(postCuid)
            .then((res) => {
                if (res.status === 200) {
                    this.setState({messages: res.data.messages});
                }
            })
            .catch(err => console.error('fetchMessages Error:', err.message));
    }
    setOrderOfMessages () {
        const bool = this.state.orderByAscend ? false : true;
        this.setState({orderByAscend: bool});
        this.state.messages.sort((a, b) => {
            if (bool) {
                return a.dateAdded < b.dateAdded ? -1 : 1 ;
            } else {
                return a.dateAdded < b.dateAdded ? 1 : -1 ;
            }
        });
    }
    openMsgDialog (name) {
        this.setState({tag: name});
        this.props.showDialog({
            type: 'textarea',
            title: '回覆給',
            htmlString: `<div class="font-size-16 font-blue u-margin-b-8">@${name}</div>`,
            inputPlaceholder: '請輸入留言......',
            showCancelButton: true,
            cancelButtonText: "取消",
            showConfirmButton: true,
            confirmButtonText: "送出",
            onClickConfirmButton: (confirmValue) => this.sendMsg(confirmValue),
            modalVerticalAlign: "top"
        });
    }
    sendMsg (confirmValue) {
        const newMessage = {
            postCuid: this.props.postCuid,
            member: {
                cuid: this.props.member.cuid,
                name: this.props.member.name,
                avatar: this.props.member.avatar
            },
            tag: this.state.tag,
            message: confirmValue.inputValue,
        };
        // console.log('newMessage:', newMessage);
        messageAPI
            .postMessage(newMessage)
            .then((res) => {
                if (res.status === 200) {
                    newMessage.cuid = res.data.cuid;
                    newMessage.dateAdded = res.data.dateAdded;
                    this.state.orderByAscend ? 
                        this.setState({messages: [...this.state.messages, newMessage]}) 
                        :
                        this.setState({messages: [newMessage, ...this.state.messages]});
                }
            })
            .catch(err => console.log(err.message));
    }
    render () {
        const {messages, orderByAscend} = this.state;
        return (
            <div className="postReply-wrapper u-expandMargin">
                <LeaveMsg
                    postAuthor={this.props.postAuthor}
                    openMsgDialog={(name) => this.openMsgDialog(name)}
                />
                <div className="message-info postReply_inner-padding u-padding-t-8 u-padding-b-8">
                    <span className="font-size-16 u-margin-r-16 line-height-32">{`${messages.length}則留言`}</span> 
                        <button className="btn btn-text u-padding-l-0 font-cadetblue" onClick={() => this.setOrderOfMessages()}>
                            {
                                orderByAscend ? 
                                <span>
                                    最新<div className="icon-btn"><i className="icon icon-up-open" /></div>
                                </span>
                                :
                                <span>
                                    依時間排列<div className="icon-btn"><i className="icon icon-down-open" /></div>
                                </span>
                            }
                        </button>  
                </div>
                {
                    messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            openMsgDialog={(name) => this.openMsgDialog(name)}
                        />
                    ))
                }
            </div>
        );
    }
}

PostReply.propTypes = {

};
export default connect(mapStateToProps, mapDispatchToProps)(PostReply);