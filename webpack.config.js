const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node-modules/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|ico|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            esModule: false
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'file-loader',
                type: 'javascript/auto',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    devServer: {
        port: 4000,
        // hot: true,
        noInfo: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            filename: 'index.html',
            template: './public/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};
