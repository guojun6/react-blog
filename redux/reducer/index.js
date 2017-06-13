import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';

import {common} from './common';
import {user} from './user';

export default combineReducers({
	common,
	user,
	routing: routerReducer
});

/**
 *  sessionInited: [type boolean] session是否初始化完成
 * 
 */