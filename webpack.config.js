// const webpack = require('webpack');
const path = require('path');

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */
module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve('build'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        query: {
                            presets: ['es2015', 'react', 'stage-2']
                        }
                    },
                    {
                        loader: 'react-svg-loader',
                        options: {
                            jsx: true, // true outputs JSX tags
                            svgo: {
                                plugins: [
                                    {removeTitle: false}
                                ],
                                floatPrecision: 2
                            }
                        }
                    },
                ]
            },
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react', 'stage-2']
                }
            },
        ]
    },
    plugins: [
        // new UglifyJsPlugin({
        //     sourceMap: true,
        //     parallel: true,
        //     uglifyOptions: {
        //         comments: false,
        //         warnings: false,
        //         screw_ie8: true,
        //         conditionals: true,
        //         unused: true,
        //         comparisons: true,
        //         sequences: true,
        //         dead_code: true,
        //         evaluate: true,
        //         if_return: true,
        //         join_vars: true,
        //     },
        // }),
    ],
    resolve: {
        alias: {
            src: path.resolve('src'),
        }
    },
};
