import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

import * as memberAPI from '../../../../fetch/memberAPI';
import * as accessLocalStorage from '../../../../fetch/accessLocalStorage';
import { fetchMember } from '../../../../redux/member';
import FadeErrMsg from '../../../../components/FadeErrMsg';
import BounceInUp from '../../../../components/BounceInUp';
import { loadingTrue, loadingFalse } from '../../../../redux/isLoading';

import './register.css';

const mapStateToProps = state => ({ member: state.member });
const mapDispatchToProps = dispatch => (bindActionCreators({
	fetchMember: fetchMember,
	loadingTrue: loadingTrue,
	loadingFalse: loadingFalse,
},dispatch));

class Register extends Component {
    constructor() {
		super();
		this.state = {
			isRegularRegister: false,
			emailCheck: false,
			passwordCheck: false,
			nameCheck: false,
			email: '',
			password: '',
			name: '',
			errorMsg: '',
		};
	}
    checkEmail(evt) {
		const validateEmail = (email) => {
			const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return regex.test(email);
		};
		if (evt.target.value === '' || validateEmail(evt.target.value) === false) {
			this.setState({
				emailCheck: false,
				errorMsg: '請輸入正確的信箱格式',
			});
			return;
		}
		this.setState({
			emailCheck: true,
			errorMsg: '',
			email: evt.target.value,
		});
	}
	checkPassword(evt) {
		if (evt.target.value === '' || evt.target.value.length < 8) {
			this.setState({
				passwordCheck: false,
				errorMsg: '密碼長度須大於8',
			});
			return;
		}
		this.setState({
			passwordCheck: true,
			errorMsg: '',
			password: evt.target.value,
		});
	}
	checkName(evt) {
		if (evt.target.value === '') {
			this.setState({
				nameCheck: false,
				errorMsg: '請輸入暱稱',
			});
			return;
		}
		this.setState({
			nameCheck: true,
			errorMsg: '',
			name: evt.target.value,
		});
    }
    requestRegister() {
		if (this.state.emailCheck === false
			|| this.state.passwordCheck === false
			|| this.state.nameCheck === false) {
			this.setState({ errorMsg: 'Oops,有資料未填寫完整喔' });
			return;
		}
		this.props.loadingTrue();
		memberAPI.register(this.state.email, this.state.password, this.state.name)
				 .then((res) => {
					this.props.loadingFalse();
					if (res.status === 200) {
						this.registerSuccess(res.data);
					}
				 })
				 .catch((err) => {
					console.log('Register, requestRegister, error:', err);
					this.props.loadingFalse();
				 });
	}
	requestLoginWithFB() {
		this.props.loadingTrue();
		const FB = window.FB;
		const requestLogin = (authResponse) => {
			memberAPI.loginWithFacebook(authResponse)
			         .then((res) => {
						this.props.loadingFalse();
						if (res.status === 200) {// 註冊成功
							this.registerSuccess(res.data);
						}
					 })
					 .catch((err) => {
						console.log('Register, requestLoginWithFB, error:', err);
						this.props.loadingFalse();
					 });
		}
		FB.getLoginStatus((res) => {
			if (res.status === 'connected') { // 使用者已登入FB && 已授權資料給你的網站
				requestLogin(res.authResponse);
			} else { //使用者已登入FB, 但尚未授權資料給你的網站 || 使用者還沒登入FB
				FB.login((res) => {
					if (res.authResponse) {
						requestLogin(res.authResponse);
					}
				});
			}
		});
	}
	registerSuccess(data) {
		accessLocalStorage.setItems(data);
		this.props.fetchMember();
		this.props.history.push('/');
	}
    render() {
		return (
			<div className="u-wrapper-fixed-w100-h100">
				<Helmet>
					<title>register</title>
				</Helmet>
				<div className="u-wrapper-absolute-center">
					<div className="form_header">
						<h3>Cat Crush</h3>
					</div>
					{
						this.state.isRegularRegister === false ? // 選擇一般註冊嗎?
						<div>
							<div className="btn-group btn-group-center btn-register">
								<input type="button" value="註冊" className="btn btn-lg btn-primary" onClick={() => this.setState({isRegularRegister: true})} />
							</div>
							<div className="btn-group btn-group-center btn-register">
								<input type="button" value="以Facebook帳號繼續" className="btn btn-lg btn-fb font-white" onClick={() => this.requestLoginWithFB()} />
							</div>
						</div>
						:
						''						
					}
					<BounceInUp inCondition={this.state.isRegularRegister}>
						<form className="form form_register">
							<div className="form-field-email icon-mail">
								<input type="email" placeholder="信箱" onBlur={evt => this.checkEmail(evt)} />
							</div>
							<div className="form-field-password icon-key">
								<input type="password" placeholder="密碼" onBlur={evt => this.checkPassword(evt)} />
							</div>
							<div className="form-field-name icon-member">
								<input type="text" placeholder="暱稱" onBlur={evt => this.checkName(evt)} />
							</div>
							<FadeErrMsg
								inCondition={this.state.errorMsg !== '' ? true : false}
								errorMsg={this.state.errorMsg} 
							/>
							<div className="btn-group btn-group-center btn-register">
								<input type="button" value="註冊" className="btn btn-lg btn-primary" onClick={() => this.requestRegister()} />
							</div>
						</form>
					</BounceInUp>		
				</div>
			</div>
		);
	}
}

// 使這個Component拿到browser history
export default connect(mapStateToProps, mapDispatchToProps)(Register);