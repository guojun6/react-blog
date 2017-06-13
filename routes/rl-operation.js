// import  login from '../containers/rl-operation/components/login';
// import  reg from '../containers/rl-operation/components/reg';

// 子路由
const regForm = {
    path: 'reg',
    getComponent: function(nextState, callback){
        // console.log(nextState); {location, params, routes}
        require.ensure([], (require) => {
            callback(null, require('../containers/rl-operation/components/reg.jsx').default);
        });
    },
    // component: reg,
};
const loginForm = {
    path: 'login',
    getComponent: function(nextState, callback){
        // console.log(nextState); {location, params, routes}
        require.ensure([], (require) => {
            callback(null, require('../containers/rl-operation/components/login.jsx').default);
        });
    },
    // component: login
};

export const RLOperation = {
	path: 'rl-operation/',
	getComponent: function(nextState, callback){
		// console.log(nextState); {location, params, routes}
        require.ensure([], (require) => {
            callback(null, require('../containers/rl-operation').default);
        });
    },
    childRoutes: [loginForm, regForm]
};