const merge = require('webpack-merge');
const options = require('./webpack.options.js');
const webpack = require('webpack');
const baseConfig = require('./webpack.base.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const extractPlugin = new ExtractTextPlugin('styles/[name].css');


console.log('>> NOTICE: Running build in PRODUCTION mode');


/**
 *
 * Plugin configs
 *
 */

const uglifyConfig = {
    comments: false,
    mangle: {
        except: ['$super', '$', 'exports', 'require']
    },
    compress: {
        warnings: false
    }
};

/**
 *
 * Main config
 *
 */

const prodConfig = {
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
        extractPlugin,
        new UglifyJSPlugin(uglifyConfig),
        new webpack.DefinePlugin(options.definePluginConfig)
    ]
};

module.exports = merge.smart(baseConfig, prodConfig);
