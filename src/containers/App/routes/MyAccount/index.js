import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import Avatar from '../../../../components/Avatar';
import FadeErrMsg from '../../../../components/FadeErrMsg';
import { uploadImgur } from '../../../../fetch/imgurAPI';
import { getMemberEmail, updatePassword } from '../../../../fetch/memberAPI';
import { changeAvatar, updateMember } from '../../../../redux/member';
import { loadingTrue, loadingFalse } from '../../../../redux/isLoading';

import './myAccount.css';

const mapStateToProps = state => ({
    member: state.member,
});
const mapDispatchToProps = dispatch => (bindActionCreators({
    changeAvatar: changeAvatar,
    updateMember: updateMember,
    loadingTrue: loadingTrue,
    loadingFalse: loadingFalse,
}, dispatch));
class MyAccount extends Component {
    constructor () {
        super ();
        this.state = {
            isAccountInfo: true,
            isFetched: false,
            hasEdit: false,
            email: '',
            emailCheck: true,
            name: '',
            nameCheck: true,
            errorMsg: '',
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            newPasswordCheck: false,
        };
    }
    componentDidMount () {
        if (!this.props.member.cuid) {
            this.props.history.push("/");
        }
        if (this.props.member.name) {
            this.setState({name: this.props.member.name});
        }
        this.fetchMemberEmail();
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.member.name && prevProps.member.name !== this.props.member.name) {
            this.setState({name: this.props.member.name});
        }
    }
    fetchMemberEmail () {
        getMemberEmail()
            .then(res => {
                if (res.status === 200) {
                    this.setState({email: res.data.email});
                    this.setState({isFetched: true});
                    this.checkEmail();
                };
            })
            .catch(err => console.error(err.response.data));
    }
    fileUploadHandler (evt) {
        if (evt.target.files && evt.target.files[0]) {
            this.props.loadingTrue();
            uploadImgur(evt.target.files[0])
                .then((imgurRes) => {
                    this.props.changeAvatar(imgurRes.data.data.link);
                    this.props.loadingFalse();
                })
                .catch((err) => {
                    console.log('imgurAPI.uploadImgur, error: ', err);
                    this.props.loadingFalse();
                });
        }
    }
    handleInput (state, evt) {
        if (evt.target.value) {
            this.setState({[state]: evt.target.value});
            this.setState({hasEdit: true});
        }
    }
    checkEmail(evt) {
		const validateEmail = (email) => {
			const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(email);
        };
        if (this.state.email === '') {
            this.setState({
				emailCheck: false,
				errorMsg: '請輸入電子信箱',
			});
			return;
        }
		if (validateEmail(this.state.email) === false) {
			this.setState({
				emailCheck: false,
				errorMsg: '請輸入正確的信箱格式',
			});
			return;
        }
		this.setState({
			emailCheck: true,
			errorMsg: '',
		});
    }
    checkName(evt) {
		if (this.state.name === '') {
			this.setState({
				nameCheck: false,
				errorMsg: '請輸入暱稱',
			});
			return;
		}
		this.setState({
			nameCheck: true,
			errorMsg: ''
		});
    }
    requestUpdate () {
        if (this.state.emailCheck === false || this.state.nameCheck === false) {
			this.setState({ errorMsg: '電子信箱或用戶名稱為必填' });
			return;
        }
        const infoForUpdate = {
            email: this.state.email,
            name: this.state.name
        };
        const updateResult = (result) => {
            if (result === 200) {
                this.setState({errorMsg: '更新成功'});
            }
            this.props.loadingFalse();
        };
        this.props.loadingTrue();
        this.props.updateMember(infoForUpdate, updateResult);
    }
    checkNewPassword () {
        if (this.state.newPassword !== this.state.confirmNewPassword) {
            this.setState({
				newPasswordCheck: false,
				errorMsg: '確認密碼與新密碼不同, 請再次輸入',
			});
			return;
        }
        this.setState({
            newPasswordCheck: true,
            errorMsg: '',
        });
    }
    requestChangePassword () {
        if (!this.state.newPasswordCheck) {
            return;
        }
        const reqData = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword,
        };
        updatePassword(reqData)
            .then(res => {
                if (res.status === 200) {
                    this.setState({errorMsg: '更新成功'});
                }
            })
            .catch(err => {
                err.response ? 
                    console.error(err.response.data)
                    : 
                    console.error('removeFavoritePost unhandled error:', err.message);
            });
    }
    onClickPersonalInfo () {
        this.setState({isAccountInfo: true});
    }
    onClickToChangePassword () {
        this.setState({isAccountInfo: false});
    }
    render () {
        const { member } = this.props;
        const { 
            isAccountInfo,
            isFetched,
            hasEdit,
            name,
            email,
            oldPassword,
            newPassword,
            confirmNewPassword
        } = this.state;
        if (!isFetched) {
            return '';
        }
        return (
            <div className="myAccount-wrapper">
                <Helmet>
					<title>Cat Crush:register</title>
				</Helmet>
                <div className="u-margin-header">
                    <div className="account-board u-div-center">
                        <div className="container">
                            <ul className="row u-text-center">
                                <li className={`col-xs-6 ${isAccountInfo ? "active" : ""}`} onClick={() => this.onClickPersonalInfo()}>
                                    個人檔案
                                </li>
                                <li className={`col-xs-6 ${!isAccountInfo ? "active" : ""}`} onClick={() => this.onClickToChangePassword()}>
                                    更改密碼
                                </li>
                            </ul>
                            {
                                isAccountInfo ? 
                                <form className="form u-padding-b-16">
                                    <div className="u-padding-t-16 u-margin-b-16">
                                        <Avatar avatarUrl={member.avatar} />
                                        <div className="u-text-center">
                                            <button type="button" className="btn btn-text file-upload u-margin-t-8 font-blue">
                                                更換頭像
                                                <input 
                                                    type="file"
                                                    capture="camera"
                                                    accept="image/*"
                                                    onChange={(evt) => this.fileUploadHandler(evt)} 
                                                />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="container u-margin-b-24">
                                        <div className="row u-margin-b-16">
                                            <label className="col-xs-12 col-sm-push-1 col-sm-2" htmlFor="">用戶名稱</label>
                                            <div className="form-field-name icon-user col-xs-12 col-sm-push-1 col-sm-8">
                                                <input 
                                                    type="text"
                                                    value={name}
                                                    onChange={(evt) => this.handleInput("name", evt)}
                                                    onBlur={evt => this.checkName(evt)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-xs-12 col-sm-push-1 col-sm-2" htmlFor="">電子信箱</label>
                                            <div className="form-field-email icon-mail col-xs-12 col-sm-push-1 col-sm-8">
                                                <input 
                                                    type="email"
                                                    value={email}
                                                    onChange={(evt) => this.handleInput("email", evt)}
                                                    onBlur={evt => this.checkEmail(evt)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="error-msg u-div-center">
                                        <FadeErrMsg
                                            inCondition={this.state.errorMsg !== '' ? true : false}
                                            errorMsg={this.state.errorMsg} 
                                        />
                                    </div>
                                    <div className="btn-group-center">
                                        <button
                                            type="button"
                                            className="btn btn-md btn-secondary"
                                            disabled={!hasEdit}
                                            onClick={() => this.requestUpdate()}
                                        >
                                            確認送出
                                        </button>
                                    </div>
                                </form>
                                :
                                <form className="form form-password">
                                    <div className="container u-margin-b-24">
                                        <div className="row u-margin-b-16">
                                            <label className="col-xs-12 col-sm-push-1 col-sm-3" htmlFor="">舊密碼</label>
                                            <div className="form-field-password icon-key col-xs-12 col-sm-push-1 col-sm-7">
                                                <input 
                                                    type="password"
                                                    value={oldPassword}
                                                    onChange={(evt) => this.handleInput("oldPassword", evt)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row u-margin-b-16">
                                            <label className="col-xs-12 col-sm-push-1 col-sm-3" htmlFor="">新密碼</label>
                                            <div className="form-field-password icon-key col-xs-12 col-sm-push-1 col-sm-7">
                                                <input 
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(evt) => this.handleInput("newPassword", evt)}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <label className="col-xs-12 col-sm-push-1 col-sm-3" htmlFor="">確認新密碼</label>
                                            <div className="form-field-password icon-key col-xs-12 col-sm-push-1 col-sm-7">
                                                <input
                                                    type="password"
                                                    value={confirmNewPassword}
                                                    onChange={(evt) => this.handleInput("confirmNewPassword", evt)}
                                                    onBlur={() => this.checkNewPassword()}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="error-msg u-div-center">
                                        <FadeErrMsg
                                            inCondition={this.state.errorMsg !== '' ? true : false}
                                            errorMsg={this.state.errorMsg} 
                                        />
                                    </div>
                                    <div className="btn-group-center">
                                        <button
                                            type="button"
                                            className="btn btn-md btn-secondary"
                                            disabled={!hasEdit}
                                            onClick={() => this.requestChangePassword()}
                                        >
                                            確認送出
                                        </button>
                                    </div>
                                </form>
                            }
                        </div>  
                    </div>
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);