const chalk = require("chalk");
const child_process = require("child_process");
const path = require("path");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

const baseConfig = require("../webpack/webpack.base.config");
const devConfig = require("../webpack/webpack.dev.config");
const config = webpackMerge(baseConfig, devConfig);

console.time("COMPILATION_TIME");

const compiler = webpack(config);

function log(service, type, message) {
    if (type === "message") {
        console.log(`[${chalk.blue(service)}]`, message);
    } else if (type === "error") {
        console.log(`[${chalk.red(service)}]`, message);
    } else if (type === "close") {
        console.log(`[${chalk.yellow(service)}]`, message);
    } else {
        console.log(service, message);
    }
}

compiler.hooks.afterEmit.tap("Build.Dev", (compilation) => {
    const entrypoint = path.join(compilation.outputOptions.path, compilation.outputOptions.filename);

    console.log("Starting App...");

    const environmentVariables = {
        ...process.env,
        JANGO_DEV: true
    };

    const argumentVariables = [
        ...process.argv.splice(2)
    ];

    console.log("ENV", environmentVariables);
    console.log("ARGS", argumentVariables);

    const proc = child_process.spawn("node", [entrypoint, ...argumentVariables], {
        env: environmentVariables
    });

    console.clear();

    proc.stdout.on("data", (data) => {
        log("App", "message", data.toString());
    });

    proc.stderr.on("data", (data) => {
        log("App", "error", data.toString());
    });

    proc.on("close", (code) => {
        log("App", "close", `child process exited with code ${code}`);
    });
});

compiler.hooks.afterCompile.tap("Build.Dev", () => {
    console.timeEnd("COMPILATION_TIME");
});

compiler.run();