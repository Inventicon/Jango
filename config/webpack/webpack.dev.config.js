const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    plugins: [
        new FriendlyErrorsWebpackPlugin()
    ],
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/
    }
};