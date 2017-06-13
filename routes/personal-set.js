// Hook for server
if (typeof require.ensure !== 'function') {
    require.ensure = function(dependencies, callback) {
        callback(require)
    };
}

export const personalSet = {
	path: 'personal-set',
	getComponent: function(nextState, callback){
        require.ensure([], (require) => {
            callback(null, require('../containers/personal-set').default);
        });
    }
};