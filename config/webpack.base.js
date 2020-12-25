/*
 * @Autor: Clairoll
 * @Date: 2020-12-24 14:02:18
 * @LastEditTime: 2020-12-25 15:11:08
 * @Email: 1755033445@qq.com
 * @description: 
 */
module.exports = {
    module: {
        rules: [
            {
                // 使用 babel-loader 来编译处理 js 和 jsx 文件
                test: /\.(js|jsx)$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            },
            {
                test:/\.(woff|svg|eot|ttf)\??.*$/,
                use:{loader:'url-loader?nmae=fonts/[name].[md5:hash:hex:7].[ext]'},
              },
              {
                  test: /\.(png|jpg|gif)$/i,
                  use: [
                    {
                      loader: 'url-loader',
                      options: {
                          limit: false,
                      },
                    },
                  ],
              },

        ]
    },
    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js", ".jsx", ".json"]
        // extensions默认值js,json使用此选项，会覆盖默认数组，这就意味着 webpack 不再尝试使用默认扩展来解析模块。对于使用其扩展导入的模块，例如，import SomeFile from "./somefile.ext"，要想正确的解析，一个包含“*”的字符串必须包含在数组中。
    },
};