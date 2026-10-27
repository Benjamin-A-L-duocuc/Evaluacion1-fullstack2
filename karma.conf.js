module.exports = function (config) {
    config.set({
        frameworks: ["jasmine"],
        files: [
            "src/tests/setup.js",
            "src/tests/**/*.spec.js",
            "src/tests/**/*.spec.jsx"
        ],
        preprocessors: {
            "src/tests/setup.js": ["webpack", "sourcemap"],
            "src/tests/**/*.spec.js": ["webpack", "sourcemap"],
            "src/tests/**/*.spec.jsx": ["webpack", "sourcemap"]
        },
        webpack: {
            mode: "development",
            devtool: "inline-source-map",
            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    ["@babel/preset-env", { targets: { node: "current" } }],
                                    ["@babel/preset-react", { runtime: "automatic" }]
                                ]
                            }
                        }
                    },
                    {
                        test: /\.css$/,
                        use: ["style-loader", "css-loader"]
                    },
                    {
                        test: /\.(png|jpe?g|gif|svg)$/i,
                        type: "asset/resource"
                    }
                ]
            },
            resolve: {
                extensions: [".js", ".jsx"]
            }
        },
        webpackMiddleware: {
            stats: "errors-only"
        },
        reporters: ["progress"],
        browsers: ["jsdom"],
        singleRun: true,
        client: {
            clearContext: false
        }
    });
};
