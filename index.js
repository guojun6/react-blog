import {Router, match, useRouterHistory} from 'react-router';
import reactDOM from 'react-dom';
import React from 'react';
import {compose, applyMiddleware, createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createHistory} from 'history';
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux';

// import 'assets/style/_base.scss';
import routes from './routes';
import reducers from './redux/reducer';

// import homeStyle from "./containers/home/style.scss";
// import personStyle from "./containers/personal-set/style.scss";

// homeStyle.unuse();
import './assets/styles/_base.scss';

let history = useRouterHistory(createHistory)();
const routerMid = routerMiddleware(history);
const middleware = [routerMid, ReduxThunk];

let store = compose(
	applyMiddleware(...middleware)
)(createStore)(reducers, window.__INIT_STATE__); // 这样是正确的 等同下面的形式
// let store = applyMiddleware(...middleware)(createStore)(reducers, {name: 'init name'});

history = syncHistoryWithStore(history, store);



match({ history, routes }, (error, redirectLocation, renderProps) => {
	// console.log(renderProps); // 这里的renderProps和服务端的renderProps一致，不传入Router会报错
	reactDOM.render(
		<Provider store={store}>
			<Router {...renderProps} />
		</Provider>,
		document.getElementById('app-app')
	);
});