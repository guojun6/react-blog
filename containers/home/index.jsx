const isNode = typeof window == 'undefined';

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Page from '../../components/page';

import style from './home.scss';
import imgMyAvatar from '../../assets/images/my-avatar.png';
import imgBear from '../../assets/images/bear.gif';

import {setBottomMenuState} from '../../redux/action/common';

class Home extends Component {
	componentWillMount() {
		if (!isNode) {
			this.props.setBottomMenuState({
				show: true
			});
		}
	}

	render() {
		return (
			<Page title="首页" className={style['home-container']}>
				<article className={style['my-card']}>
					<div className={style['my-avatar']}>
						<img src={imgMyAvatar} />
					</div>
					<div className={style['my-info']}>
						<div className={style['name']}>黄国俊<span className={style['from']}>(广东工业大学18届毕业生)</span></div>
						
						<div className={style['contact-info']}>电话：18826136267</div>
						<div className={style['contact-info']}>邮箱：iamhuangguojun@163.com</div>
					</div>
				</article>
				<article className={style['YY']}>
					<section>
						应聘YY前端开发实习生
					</section>
					<div className={style["bear"]}>
						<img src={imgBear}/>
					</div>
				</article>
			</Page>
		);
	}
}

const mapStateToProps = function(state, ownProps) {
	return {
		state
	}
};
const mapDispatchToProps = {
	setBottomMenuState,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);