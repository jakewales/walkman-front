const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// https://webpack.js.org/guides/hot-module-replacement/
// hot reload

module.exports = {
    mode: 'development',
    entry: './src/ts/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },{
                test: /\.html$/,
                use: 'raw-loader'
            },{
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader'
                    },{
                        loader: 'css-loader'
                    },{
                        loader: 'less-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8866
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            contentBase: path.join(__dirname, '/src'),
            watchContentBase: true
        })
    ]
};