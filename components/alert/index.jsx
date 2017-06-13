/**
 * render函数中用三木判断返回的DOM结构只能是一个父节点
 * 和所有的return一样
 */

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {setAlertState} from '../../redux/action/common';

import style from './alert.scss';

class Alert extends Component {
	static defaultProps = {
		title: '',
		body: '',
		show: false,
		btn: 'both', // none both ensure cancel
		ensureBtnTxt: '确定',
		cancelBtnTxt: '取消',
		showTitle: true,
		showBody: true,

	}
	static propTypes = {
		btn: PropTypes.oneOf(['none', 'both', 'eusure', 'cancel']),
		title: PropTypes.string,
		body: PropTypes.string,
		show: PropTypes.bool,
		ensureBtnTxt: PropTypes.string,
		cancelBtnTxt: PropTypes.string,
		showTitle: PropTypes.bool,
		showBody: PropTypes.bool,
		onEnsure: PropTypes.func,
		onCancel: PropTypes.func,
	}
	clkEnsure(e) {
		e.stopPropagation();
		e.preventDefault();
		if (this.props.onEnsure instanceof Function) {
			this.props.onEnsure(e);
		}
		this.closeAlert(e);
	}
	clkCancel(e) {
		e.stopPropagation();
		e.preventDefault();
		if (this.props.onCancel instanceof Function) {
			this.props.onCancel(e);
		}
		this.closeAlert(e);
	}
	closeAlert(e) {
		this.props.setAlertState({show: false});
	}
	// 生成按钮
	genBtn() {
		let type = this.props.btn;
		if (type == 'none') {
			return null;
		}
		if (type == 'both') {
			return (
				<div className={style['btn-box']}>
					<div className={style['btn-ensure']} onClick={this.clkEnsure.bind(this)}>{this.props.ensureBtnTxt}</div>
					<div className={style['btn-cancel']} onClick={this.clkCancel.bind(this)}>{this.props.cancelBtnTxt}</div>
				</div>
			);
		}
		if (type == 'cancel') {
			return (
				<div className={style['btn-box']}>
					<div className={style['btn-cancel']} onClick={this.clkCancel.bind(this)}>{this.props.cancelBtnTxt}</div>
				</div>
			);
		}
		if (type == 'ensure') {
			return (
				<div className={style['btn-box']}>
					<div className={style['btn-ensure']} onClick={this.clkEnsure.bind(this)}>{this.props.ensureBtnTxt}</div>
				</div>
			);
		}

	}


	render() {
		return (
			<article className={classnames(style['barrier'], {'app-hide': !this.props.show})} onClick={this.closeAlert.bind(this)}>
				<section className={style['ctn']}>
				{
					this.props.showTitle ? 
					<div className={style["title"]}>
						{this.props.title}
					</div> : null
				}
				{
					this.props.showBody ? 
					<div className={style["body"]}>
						{this.props.body}
					</div> : null
				}
				{
					this.genBtn()
				}
					

					
				</section>
			</article>
		);
	}
};

const mapDispatchToProps = {
	setAlertState,
};

export default connect(null, mapDispatchToProps, null, {withRef: true})(Alert);