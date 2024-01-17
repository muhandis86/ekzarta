'use strict';

const webpack = require('webpack'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
    fs = require('fs');

let entry = {
    app: './app',
}

if (fs.existsSync(__dirname + '/assets/mobile.js')) {
    entry.mobile = './mobile';
}

module.exports = function(env) {
    let config = {
        context: __dirname + '/assets',
        entry: entry,
        output: {
            path: __dirname + '/public',
            filename: '[name].bundle.js',
            chunkFilename: '[name].[chunkhash].js',
            library: '[name]',
            publicPath: '/bundles/webpack/'
        },
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }],
            noParse: function(content) {
                return /owl.carousel/.test(content);
            }
        },
        resolve: {
            modules: [
                __dirname + '/public/node_modules',
                __dirname + '/assets/blocks',
                __dirname + '/assets/js',
                'node_modules'
            ]
        },
        plugins: [
            new CleanWebpackPlugin([__dirname + '/public/bundles/webpack/']),
            new webpack.SourceMapDevToolPlugin({
                filename: '[name].bundle.map',
                // exclude: ['vendor.bundle.js']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: function(module) {
                    return module.size() > 30000 && module.context && module.context.indexOf("node_modules") !== -1;
                }
            })
        ]
    };

    if (env === 'production') {
        config.plugins.push(
            new UglifyJsPlugin({
                sourceMap: true,
                cache: true
            })
        );
    }

    return config;
};
