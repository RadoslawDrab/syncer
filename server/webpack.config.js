const tsconfig = require('./tsconfig.json')

const { paths, baseUrl } = tsconfig['compilerOptions']
const aliases = Object.keys(paths).reduce((obj, pathKey) => {
	const starRegex = /\/\*/g // /*
	const currentPathRegex = /(?<!\.)\.\// // ./
	const lastSlashRegex = /\/?$/g // e.g. src/

	const basePath = baseUrl.replace(currentPathRegex, '').replace(lastSlashRegex, '')
	const alias = pathKey.replace(starRegex, '')

	const path = paths[pathKey][0].replace(starRegex, '').replace(currentPathRegex, '')

	const resolvePath = `${basePath}/${path}/`
	return { ...obj, [alias]: `${__dirname}/${resolvePath}` }
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
