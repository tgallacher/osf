const merge = require('webpack-merge');
const webpack = require('webpack');
const options = require('./webpack.options.js');
const baseConfig = require('./webpack.base.js');


/**
 *
 * Plugin configs
 *
 */

const devDefinePluginConfig = Object.assign(
    {},
    options.definePluginConfig,
    {
        __PRODUCTION__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('development')
    }
);


/**
 *
 * Main config
 *
 */

const devConfig = {
    // watch: true,
    devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
                test: /\.(je?pg|png|gif|svg)$/i,
                loaders: [
                    {
                        loader: 'url-loader',
                        query: {
                            limit: '100000',
                            name: 'images/[name].[hash:10].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin(devDefinePluginConfig)
    ]
};


module.exports = merge.smart(baseConfig, devConfig);
