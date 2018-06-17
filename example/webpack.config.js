const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

const config = {

    entry: "./example/index.js",

    resolve: {
        alias: {
            "line-art": "../src"
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
            template: "./example/index.html",
            filename: "./index.html"
        })
    ],

    devtool: 'source-map'
};

if (process.env.NODE_ENV === "production") {
    config.output = {
        path: path.resolve(__dirname, "../docs")
    };
}

module.exports = config;