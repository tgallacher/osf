const path = require('path')
const options = require('./webpack.options.js')

/**
 *
 * Main config
 *
 */

module.exports = {
    context: __dirname,
    devtool: 'inline-source-map',
    entry: {
        app: [
            'babel-polyfill', // babel-preset-env will only bring in what we need from this
            path.join(options._JSSRCDIR, 'index.js')
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            options._JSSRCDIR,
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                include: options._JSSRCDIR,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        configFile: '.eslintrc.json',
                        emitWarning: true,
                        failOnError: false
                    }
                }]
            },
            {
                test: /\.jsx?$/,
                include: options._JSSRCDIR,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        path: options._JSOUTDIR,
        filename: 'scripts/[name].js',
        publicPath: 'assets/'
    },
    plugins: []
};
