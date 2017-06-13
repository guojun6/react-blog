/**
 * componentWillReceiveProps第一次接受props不会触发
 */

import React, {Component} from 'react';
import classnames from 'classnames';

import style from './toast.scss';

class Toast extends Component {
	data = {
		timer: null
	}
	state = {
		show: false
	}
	static defaultProps = {
		showTime: 0, // 时间戳 传入不同的时间戳则显示
		txt: ''
	}
	// 第一次接受props不会触发
	componentWillReceiveProps(nextProps) {
		if (nextProps.showTime == this.props.showTime) {
			return;
		}
		this.setState((state, props) => {
			return {
				show: true
			};
		});
		clearTimeout(this.data.timer);
		this.data.timer = setTimeout(() => {
			this.setState((state, props) => {
				return {
					show: false
				};
			});
		}, 2000);
	}
	// props或者state改变都会触发，在这里不合适了
	// shouldComponentUpdate(nextProps, nextState) {
	// 	console.log('shouldComponentUpdate');
	// 	if (nextProps.showTime != this.props.showTime) return true;
	// 	else return false;
	// }
	render() {
		return (
			<div className={classnames(style['ctn'], this.state.show ? style['show'] : '')}>
				<p className={style['txt']}>{this.props.txt}</p>
			</div>
		);
	}
};

export default Toast;