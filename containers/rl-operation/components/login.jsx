import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

import md5 from '../../../utils/md5';

import {setToastState} from '../../../redux/action/common';

import style from './rl-cpn.scss';

class Login extends Component {
	async login(e) {
		e.preventDefault();
		e.stopPropagation();

		if (!(this.refs.lpassname.value && this.refs.lpassward.value)) {
			this.props.setToastState({
				showTime: (new Date()).getTime(),
				txt: '帐号、密码都要输入才能登录呢'
			});
			return;
		}
		let result = await axios.post('/api/login', {
			mia: this.refs.lpassname.value,
			me: md5(this.refs.lpassward.value)
		});
		if (result.data.state.code == 0) {
			this.props.router.push({
				pathname: '/home'
			});
		} else {
			this.props.setToastState({
				showTime: (new Date()).getTime(),
				txt: result.data.state.msg
			});
		}
	}
	render() {
		return (
			<form className={style['ctn']}>
				<div className={style['control']}>
					<label>帐号：</label>
					<input type="text" ref="lpassname" />
				</div>
				<div className={style['control']}>
					<label>密码：</label>
					<input type="password" ref="lpassward" />
				</div>
				<div className={style['control']}>
					<button type="submit" onClick={this.login.bind(this)}>登录</button>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = {
	setToastState
};

export default connect(null, mapDispatchToProps)(Login);