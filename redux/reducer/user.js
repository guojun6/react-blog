import {
	SET_USER_INFO,
	SET_USER_AVATAR
} from '../action/user';

let initState = {};

export function user(state = initState, action) {
	switch(action.type) {
		case SET_USER_INFO:
			return {
				...state,
				...action.info
			};
		case SET_USER_AVATAR:
			return {
				...state,
				...{avatarUrl: action.avatarUrl}
			};
		default:
			return {...state};
	}
};