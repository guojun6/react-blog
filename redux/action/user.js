import axios from 'axios';

export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_USER_AVATAR = 'SET_USER_AVATAR';

// 请求获取用户头像链接
// export function getUserAcvatar() {
// 	return async (dispatch, getState) => {
// 		let result = await axios.get('/api/user/get-avatar');
// 		console.log('getUserAcvatar', result);
// 		if (result.data.state.code == 0) {
// 			dispatch(setUserAvatar(result.data.data));
// 			return true;
// 		} else {
// 			return result.data;
// 		}
		
// 	}
// };

// 请求获取用户信息
export function getUserInfo() {
	return async (dispatch, getState) => {
		let result = await axios.get('/api/user/get-user-info');
		if (result.data.state.code == 0) {
			dispatch(setUserInfo(result.data.data));
			return true;
		} else {
			return result.data;
		}
		
	}
};

// 更新用户信息
export function setUserInfo(info) {
	return {
		type: SET_USER_INFO,
		info
	};
};
// 更新用户头像
// export function setUserAvatar(avatarUrl) {
// 	return {
// 		type: SET_USER_AVATAR,
// 		avatarUrl
// 	};
// };