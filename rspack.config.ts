import type { Configuration } from "@rspack/cli";
import { ExternalsPlugin, ProgressPlugin } from "@rspack/core";
import nodeExternals from "webpack-node-externals";
import { RunScriptWebpackPlugin } from "run-script-webpack-plugin";
const config: Configuration = {
    context: __dirname,
    target: "node",
    entry: {
        main: ["./src/main.ts"],
    },
    externalsType: "commonjs",
    resolve: {
        extensions: ["...", ".ts"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                decorators: true,
                            },
                            transform: {
                                legacyDecorator: true,
                                decoratorMetadata: true,
                            },
                        },
                    },
                },
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new ProgressPlugin(),
        new ExternalsPlugin("commonjs", nodeExternals()),
        !(process.env.NODE_ENV === 'production') &&
        new RunScriptWebpackPlugin({
            name: "main.js",
            autoRestart: false,
        }),
    ].filter(Boolean),
    devServer: {
        hot: false,
        devMiddleware: {
            writeToDisk: true,
        },
    },
    output: {
        filename: "[name].js",
        clean: true,
    },
};

export default config;
