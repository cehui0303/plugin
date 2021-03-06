const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')

const HtmlWebpackPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config')
const config = require('./index')


module.exports = merge(baseConfig, {
    mode:'development',
    devServer: {
        disableHostCheck: true,
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: path.posix.join(config.path.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: config.dev.host,
        port: config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay
            ? { warnings: false, errors: true }
            : false,
        publicPath: config.path.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: config.dev.poll,
        },
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        // https: true,
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'development'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});