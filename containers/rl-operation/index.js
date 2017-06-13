import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Page from '../../components/page';

import style from './rl-operation.scss';

import {setBottomMenuState} from '../../redux/action/common';

const isNode = typeof window == 'undefined';

class RegisterLogin extends Component {
	state = {}
	componentWillMount() {
		if (!isNode) {
			this.props.setBottomMenuState({
				show: false
			});
		}
		
	}
	
	render() {
		return (
			<Page title="注册/登录" className={style['ctn']}>
				<section className={style['box']}>
					<header className={style['tags']}>
						<div className={style['tag-item']}>
							<Link to='/rl-operation/reg' activeClassName="rl-operation-active">注册</Link>
						</div>
						<div className={style['tag-item']}>
							<Link to='/rl-operation/login' activeClassName="rl-operation-active">登录</Link>
						</div>
					</header>
					{this.props.children}
				</section>
			</Page>
		);
	}
}
const mapStateToProps = function(state, ownProps) {
	return {};
};
const mapDispatchToProps = {
	setBottomMenuState,
};
export default connect(mapStateToProps, mapDispatchToProps)(RegisterLogin);