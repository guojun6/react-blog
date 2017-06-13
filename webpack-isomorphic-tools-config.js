
module.exports = {
    debug: false,
    assets: {
        images: {
            extensions: ['png', 'jpg', 'gif', 'ico', 'svg'],
        },
        html: {
			extension: 'html',
		},
		fonts: {
			extensions: ['woff', 'woff2', 'eot', 'ttf'],
		},
        // styles: {
        //   extensions: ['css', 'less', 'scss'],
        // },
        scss: {
        	extensions: ['scss', 'less']
        },
        css: {
          extensions: ['css']
        }
    },

    // to resolve "TypeError: require.context is not a function" or "TypeError: require.ensure is not a function"
    patch_require: true,
};
