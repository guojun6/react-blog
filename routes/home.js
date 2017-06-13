// Hook for server
// if (typeof require.ensure !== 'function') {
//     require.ensure = function(dependencies, callback) {
//         callback(require)
//     };
// }
import Home from '../containers/home';
export const home = {
	path: 'home',
	getComponent: function(nextState, callback){
		// console.log(nextState); {location, params, routes}
        require.ensure([], (require) => {
            callback(null, require('../containers/home').default);
        });
    }
};