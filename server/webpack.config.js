const tsconfig = require('./tsconfig.json')

const { paths, baseUrl } = tsconfig['compilerOptions']
const aliases = Object.keys(paths).reduce((obj, pathKey) => {
	const starRegex = /\/\*/g
	const alias = pathKey.replace(starRegex, '')
	const path = paths[pathKey][0].replace(starRegex, '').replace('./', baseUrl.replace('./', ''))
	return { ...obj, [alias]: `${__dirname}/${path}/` }
}, {})

const config = {
	target: 'node',
	entry: './src/index.ts',
	output: {
		filename: 'bundle.js',
		path: `${__dirname}/dist`
	},
	resolve: {
		extensions: ['.ts', '.js'],
		alias: aliases
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
