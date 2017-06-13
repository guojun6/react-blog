import React, {Component} from 'react';
import {Link} from 'react-router';
import classnames from 'classnames';

import style from './bottom-menu.scss';

class BottomMenu extends Component {
	render() {
		return (
			<section className={classnames(style['ctn'], {'app-hide': !this.props.show})}>
				<div className={style['item']}>
					<Link to="/home" activeClassName="bottom-menu-active">首页</Link>
				</div>
				<div className={style['item']}>
					<Link to="/home" activeClassName="bottom-menu-active">博文</Link>
				</div>
				<div className={style['item']}>
					<Link to="/home" activeClassName="bottom-menu-active">图片</Link>
				</div>
				<div className={style['item']}>
					<Link to="/home" activeClassName="bottom-menu-active">留言</Link>
				</div>
				<div className={style['item']}>
					<Link to="/personal-set" activeClassName="bottom-menu-active">个人</Link>
				</div>
			</section>
		);
	}
}

export default BottomMenu;