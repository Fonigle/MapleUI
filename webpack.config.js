const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');

let ExtractTextPluginMain = new ExtractTextPlugin({
    filename: process.env.NODE_ENV === 'production' ? "[name].min.css" : "[name].css",
    allChunks: true
});

module.exports = {
    entry: {
        'maple-ui': ['./src/index.js'],
    },
    output: {
        path: path.resolve(__dirname, './dev'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            'maple-ui': path.resolve(__dirname, './src'),
            'two-way': path.resolve(__dirname, './src/_mixins/two-way/two-way.js'),
        }
    },
    devtool: '#source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve('src')
                ],
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: ExtractTextPluginMain.extract({
                            fallback: 'vue-style-loader',
                            use: [{
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            }, {
                                loader: "sass-loader",
                                options: {
                                    sourceMap: true
                                }
                            }]
                        }),
                        esModule: true
                    },
                    extractCSS: true
                },
                exclude: '/node_modules'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPluginMain.extract({
                    fallback: 'vue-style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPluginMain.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: false
                        }
                    }, {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader',
                query: {
                    limit: 1024,
                    name: 'images/[hash:16].[ext]'
                }
            },
            {
                test: /\.(ttf|woff2?|eot|svg)$/,
                loader: 'url-loader',
                query: {
                    limit: 51200,
                    name: 'iconfonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    performance: {
        hints: false
    },
    plugins: [
        ExtractTextPluginMain,
    ],
    externals: {
        'swiper/dist/js/swiper.js': {
            root: 'Swiper',
            commonjs: 'swiper/dist/js/swiper.js',
            commonjs2: 'swiper/dist/js/swiper.js',
            amd: 'swiper'
        },
    }
};

if (process.env.NODE_ENV === 'production')
{
    module.exports.output = {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].min.js',
        libraryTarget: 'umd'
    };
    module.exports.devtool = false;
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false
            },
            comments: false
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
