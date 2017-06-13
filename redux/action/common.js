export const SET_ALERT_STATE = 'SET_ALERT_STATE';
export const SET_TOAST_STATE = 'SET_TOAST_STATE';
export const SET_BOTTOM_MENU_STATE = 'SET_BOTTOM_MENU_STATE';

// 设置alert状态
export const setAlertState = (alerting) => {
	return {
		type: SET_ALERT_STATE,
		alerting,
	};
};

// 设置toast状态
export const setToastState = (toast) => {
	return {
		type: SET_TOAST_STATE,
		toast,
	};
};

// 设置bottom menu 状态
export const setBottomMenuState = (bottomMenu) => {
	return {
		type: SET_BOTTOM_MENU_STATE,
		bottomMenu,
	};
};