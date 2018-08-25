const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const pkg = require("pkg");

const baseConfig = require("../webpack/webpack.base.config");
const prodConfig = require("../webpack/webpack.prod.config");
const config = webpackMerge(baseConfig, prodConfig);

console.time("COMPILATION_TIME");

const compiler = webpack(config);

compiler.hooks.afterEmit.tap("Build.Dev", (compilation) => {
    const entrypoint = path.join(compilation.outputOptions.path, compilation.outputOptions.filename);
    const outputPath = path.join(compilation.outputOptions.path, "bin", process.env.npm_package_name);

    // Package app
    pkg.exec([entrypoint, "--target", "host", "--output", outputPath]);
});

compiler.hooks.afterCompile.tap("Build.Dev", () => {
    console.timeEnd("COMPILATION_TIME");
});

compiler.run();