import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import md5 from '../../../utils/md5';

import {setToastState} from '../../../redux/action/common';

import style from './rl-cpn.scss';

class Reg extends Component {
	async register(e) {
		e.preventDefault();
		e.stopPropagation();
		// console.log(this.refs.passname.value, this.refs.passward.value);
		let result = await axios.post('/api/register', {
			mia: this.refs.rpassname.value,
			me: md5(this.refs.rpassward.value),
			kidname: this.refs.rkidname.value
		});
		if (result.data.state.code == 0) {
			this.props.setToastState({
				showTime: (new Date()).getTime(),
				txt: '请登录'
			});
			this.props.router.push({
				pathname: '/rl-operation/login'
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
					<input type="text" ref="rpassname" placeholder="4-16个常规字符，开头不能为数字" />
				</div>
				<div className={style['control']}>
					<label>密码：</label>
					<input type="password" ref="rpassward" placeholder="4-16个常规字符" />
				</div>
				<div className={style['control']}>
					<label>昵称：</label>
					<input type="text" ref="rkidname" />
				</div>
				<div className={style['control']}>
					<button type="submit" onClick={this.register.bind(this)}>注册</button>
				</div>
			</form>
		);
	}
}

const mapDispatchToProps = {
	setToastState,
};

export default connect(null, mapDispatchToProps)(Reg);