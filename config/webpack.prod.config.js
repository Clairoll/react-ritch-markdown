/*
 * @Autor: Clairoll
 * @Date: 2020-12-24 14:03:10
 * @LastEditTime: 2020-12-24 16:04:34
 * @Email: 1755033445@qq.com
 * @description: 
 */
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将组件的css打包成单独的文件输出到`lib`目录中
// 引入 注意是使用解构的方式引入的 名字一定要正确
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const prodConfig = {
    mode: 'production', // 开发模式
    entry: path.join(__dirname, "../components/index.jsx"),
    output: {
        path: path.join(__dirname, "../lib/"),
        filename: "index.js",
        libraryTarget: 'umd', // 采用通用模块定义
        libraryExport: 'default', // 兼容 ES6 的模块系统、CommonJS 和 AMD 模块规范
    },
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             loader: [MiniCssExtractPlugin.loader, 'css-loader?modules'],
    //         },
    //     ]
    // },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "main.min.css" // 提取后的css的文件名
        }),
        new CleanWebpackPlugin()
    ],
    externals: { // 定义外部依赖，避免把react和react-dom打包进去
        react: {
            root: "React",
            commonjs2: "react",
            commonjs: "react",
            amd: "react"
        },
        "react-dom": {
            root: "ReactDOM",
            commonjs2: "react-dom",
            commonjs: "react-dom",
            amd: "react-dom"
        },
        "antd": {
            root: "antd",
            commonjs2: "antd",
            commonjs: "antd",
            amd: "antd"
        }
    },
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和prodConfig合并为一个配置