const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "development",
    devtool: "eval",
    resolve: {
        extensions: [".jsx", ".js"]
    },
    entry : {
        app: "./src/index"
    },
    module: {
        rules: [
            {
                test: /.jsx?/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                ["@babel/preset-env", {
                                    targets: {
                                        browsers: ["> 1% in KR"]
                                    },
                                    debug: true
                                }],
                                "@babel/preset-react"
                            ],
                            plugins: ["react-hot-loader/babel"]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    output: {
        path: path.join(__dirname, "/build"),
        filename: "bundle.js"
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ debug: true }),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "style.css"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "/build"),
        index: "index.html",
        port: 9000
    }
}