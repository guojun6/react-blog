export SESSION_INITED = 'SESSION_INITED';

// 服务端渲染
export const sessionInited = function(inited) {
	return {
		type: SESSION_INITED,
		inited
	};
};