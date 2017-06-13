import {
	SET_ALERT_STATE,
	SET_TOAST_STATE,
	SET_BOTTOM_MENU_STATE,
} from '../action/common';

let initState = {
	alerting: {},
	toast: {
		showTime: null,
		txt: null
	},
	bottomMenu: {
		show: true
	}
};

export function common(state = initState, action) {

	switch(action.type) {
		case SET_ALERT_STATE:
			return {
				...state,
				...{
					alerting: {...state.alerting, ...action.alerting}
				}
			};
		case SET_TOAST_STATE:
			return {
				...state,
				...{
					toast: {...state.toast, ...action.toast}
				}
			};
		case SET_BOTTOM_MENU_STATE:
			return {
				...state,
				...{
					bottomMenu: {...state.bottomMenu, ...action.bottomMenu}
				}
			};
		default:
			return {...state};
	}
};