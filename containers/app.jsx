/**
 * props的改变会触发render函数
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {CSSTransitionGroup} from 'react-transition-group';

import Alert from '../components/alert';
import Toast from '../components/toast';
import BottomMenu from '../components/bottom-menu';

import style from '../assets/styles/app.scss';

class App extends Component {
	render() {
		return (
			<article className={style['app']}>
				{/*<CSSTransitionGroup
				ref="abaa"
					component="div"
					className="aabbbb"
					transitionName='app-fade-in'
					transitionEnterTimeout={300}
					transitionLeaveTimeout={300}
					transitionEnter={true}
					transitionLeave={true}
					transitionAppear={true}
				>*/}
					{
						
						this.props.children
						
					}
				{/* </CSSTransitionGroup>*/}
				<Alert
					title = {this.props.alerting.title}
					body = {this.props.alerting.body}
					show = {this.props.alerting.show}
					btn = {this.props.alerting.btn}
					showTitle = {this.props.alerting.showTitle}
					showBody = {this.props.alerting.showBody}
					ensureBtnTxt = {this.props.alerting.ensureBtnTxt}
					cancelBtnTxt = {this.props.alerting.cancelBtnTxt}
				/>
				<Toast 
					showTime = {this.props.toast.showTime}
					txt = {this.props.toast.txt}
				/>
				<BottomMenu show = {this.props.bottomMenu.show}/>
			</article>
		);
	}
}

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {
// 		setAlertState() {
// 			dispatch(setAlertState());
// 		}
// 	}
// }
// const mapDispatchToProps = {
//   onClick: (filter) => {
//     type: 'SET_VISIBILITY_FILTER',
//     filter: filter
//   };
// }
// 两者相同作用
// const mapDispatchToProps = (
//   dispatch,
//   ownProps
// ) => {
//   return {
//     onClick: () => {
//       dispatch({
//         type: 'SET_VISIBILITY_FILTER',
//         filter: ownProps.filter
//       });
//     }
//   };
// }
function mapStateToProps({
	common
}, ownProps) {
	return {
		alerting: common.alerting,
		toast: common.toast,
		bottomMenu: common.bottomMenu,
	};
}

export default connect(mapStateToProps, null)(App);