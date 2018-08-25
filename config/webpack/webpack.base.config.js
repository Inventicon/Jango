const path = require("path");


const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
    entry: path.resolve("src/index.ts"),
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    transpileOnly: true,
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve("dist")
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            workers: 1
        })
    ],
    target: "node",
    node: {
        console: false,
        global: true,
        process: true,
        __filename: "mock",
        __dirname: "mock",
        Buffer: true,
        setImmediate: true
    }
};