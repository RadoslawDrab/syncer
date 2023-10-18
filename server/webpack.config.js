const config = {
	target: 'node',
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		path: `${__dirname}/dist`
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: {
			src: `${__dirname}/src/`
		}
	},
	module: {
		rules: [{ test: /\.ts$/, loader: 'ts-loader' }]
	}
}
module.exports = (env, argv) => {
	if (argv.mode === 'development') {
		config.devtool = 'source-map'
		config.stats = {
			errorDetails: true
		}
	}
	return config
}
