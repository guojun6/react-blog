const isNode = typeof window == 'undefined';

import React, {Component} from 'react';
import axios from 'axios';
import fetch from 'isomorphic-fetch';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import classnames from 'classnames';

import Page from '../../components/page';

import {
	setAlertState,
	setToastState,
	setBottomMenuState
} from '../../redux/action/common';
import {
	// getUserAcvatar,
	getUserInfo,
} from '../../redux/action/user';
import {imageCompress} from '../../utils/img-utils';

import style from './personal-set.scss';

// style.use();
class PersonalSet extends Component {
	state = {
		noLogin: null
	}
	componentWillMount() {
		if (!isNode) {
			this.props.setBottomMenuState({
				show: true
			});
		}
	}
	componentDidMount() {
		// this.getAvatar();
		this.getUserInfo();
		// axios.post('/php/article-tag.php')
		// 	.then(function(response) {
		// 		console.log(response);
		// 	}).catch(function(err) {
		// 		console.log(err, '..e');
		// 	});
		// fetch('/php/article-tag.php', {
		// 	method: 'POST'
		// }).then(function(response) {
		// 	return response.json();
		// }).then(function(json) {
		// 	console.log(json);
		// }).catch(function(err) {
		// 	console.log(err, '..e');
		// });
		// console.log(this.props.sessionInited);
		// if (this.props.sessionInited) {
			// this.cdmRequest();
		// }
	}

	async uploadAvatar() {
		// 前端稍稍做简单拦截 node也有判断
		// console.log(this.refs.uploadAvatar.files);√
		// console.log(this.refs.uploadAvatar.file);
		let files = this.refs.uploadAvatar.files;
		if (this.refs.uploadAvatar.value.length < 1 || !files) {
			return false;
		}
		if (files.length > 1) {
			this.props.setToastState({
				showTime: (new Date()).getTime(),
				txt: '只能上传一个图片哦~'
			});
			return false;
		} else if (files[0].size > 20 * 1000) {
			this.props.setToastState({
				showTime: (new Date()).getTime(),
				txt: '上传的图片不能超过200KB哦'
			});
			return false;
		}
		let formData = new FormData();
		let avatar = await imageCompress(files[0]);
		// 上传多个文件情况
		// for (let i = 0; i < files.length; i++) {
		// 	console.log('append file'+i);
		// 	formData.append('avatar', files[i]);
		// }
		// 利用xhr
		// xhr = new XMLHttpRequest();
		// xhr.open('POST', '/api/user/upload-avatar');
		// xhr.onload = function(e) {
		// 	console.log(e);
		// 	console.log('send avatar successfully');
		// }
		// xhr.onprogress = function(e) {
		// 	console.log(e);
		// }
		// 
		// xhr.send(formData);
		formData.append('avatar', avatar);
		axios.post('/api/user/upload-avatar', formData, {
			headers: {
				'Content-Type': 'multiple/form-data'
			}
		}).then(res => {
			if (res.data.state.code !== 0) {
				setToastState({
					showTime: (new Date()).getTime(),
					txt: res.data.state.msg
				});
			} else {
				// this.getAvatar();
			}
		});
	}
	// 预览
	// previewAvatar() {
	// 	let _this = this;
	// 	let file = this.refs.uploadAvatar.files[0];
	// 	let fileReader = new FileReader();
	// 	fileReader.addEventListener('load', function(e) {
	// 		let oImg = new Image();
	// 		oImg.addEventListener('load', function() {
	// 			console.log('done');
	// 		});
	// 		oImg.src = this.result;
	// 		_this.refs.previewAvatar.removeChild(_this.refs.previewAvatar.children[0])
	// 		_this.refs.previewAvatar.appendChild(oImg);
	// 	}, false);
	// 	fileReader.readAsDataURL(file);
	// }
	// 获取头像链接
	// async getAvatar() {
	// 	let res = await this.props.getUserAcvatar();
	// 	if (res !== true) {
	// 		setToastState({
	// 			showTime: (new Date()).getTime(),
	// 			txt: res.state.msg
	// 		});
	// 	}
	// }
	// 更新头像
	updateAvatar() {
		this.refs.uploadAvatar.click();
	}
	// 获取用户信息
	async getUserInfo() {
		if (this.props.user.avatarUrl && this.props.user.kidname && this.props.user.passname) {
			return false;
		}
		let res = await this.props.getUserInfo();
		if (res !== true) {
			if (res.state.code === 10086) {
				this.setState({
					noLogin: true
				});
			}
			setToastState({
				showTime: (new Date()).getTime(),
				txt: res.state.msg
			});
		}
	}
	render() {
		return (
			<Page title="个人中心" className={style["ctn"]}>
				<header>
					<div className={classnames(style['avatar-box'], {'app-hide': this.state.noLogin})}>
						<img
							ref="avatar"
							onClick={this.updateAvatar.bind(this)}
							src={this.props.user.avatarUrl}
						 />
					</div>
					<div className={classnames(style['btn-login'], {'app-hide': !this.state.noLogin})}>
						<Link to={{pathname: '/rl-operation/login'}}>去登录</Link>
					</div>
					<input type="file" ref="uploadAvatar" onChange={this.uploadAvatar.bind(this)} />
					{/*<div ref="previewAvatar"></div>*/}
				</header>
				{
				!this.state.noLogin ?
				(<article>
					<ul className={style['setting-box']}>
						<li className={style['item']}>
							<div className={style['setting-name']}>登录帐号</div>
							<div className={style['setting-val']}>{this.props.user.passname}</div>
						</li>
						<li className={style['item']}>
							<div className={style['setting-name']}>昵称</div>
							<div className={style['setting-val']}>{this.props.user.kidname}</div>
						</li>
					</ul>
					<ul className={style['setting-box']}>
						<li className={style['item']}><div className={style['setting-name']}>我的评论</div></li>
					</ul>
				</article>)
				:
				null
				}
				
			</Page>
		);
	}
}

const mapStateToProps = function(state, ownProps) {
	return {
		user: state.user
	};
};
const mapDispatchToProps = {
	setAlertState,
	setToastState,
	setBottomMenuState,
	// getUserAcvatar,
	getUserInfo,
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalSet);

