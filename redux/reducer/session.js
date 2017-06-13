import {
	SESSION_INITED
} from '../action/session';

export const sessionInited = function(state = false, action) {
	switch(action.type) {
		case SESSION_INITED:
			return action.inited;
		default:
			return state;
	}
};