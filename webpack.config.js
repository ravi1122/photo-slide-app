const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CWD = process.cwd();
const SRC_DIR = path.join(CWD, 'src');

module.exports = {
    entry: path.join(SRC_DIR, "index.js"),
    output: {
        path: path.join(CWD, 'build')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    customize: require.resolve('babel-preset-react-app/webpack-overrides'),
                    presets: ['react-app']
                }
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                }]
            }, {
                test: /\.(sa|sc|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                include: SRC_DIR
            }
        ]
    },
    plugins: [
        new ManifestPlugin({
            fileName: 'manifest.json'
        }),
        new MiniCssExtractPlugin({
            fileName: '[name].[hash:6].css',
        }),

        new HtmlWebPackPlugin({
            template: path.join(SRC_DIR, 'index.html'),
            filename: 'index.html'
        })
    ],
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.scss', '.html']
    }
}
