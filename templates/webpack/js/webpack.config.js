const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");

module.exports = {
    entry: "./src/index.js",
    resolve: {
        extensions: [".js", ".jsx"],
        fallback: {
            crypto: require.resolve("crypto-browserify"),
        },
        alias: {
            "@src": path.resolve(__dirname, "./src"),
        },
    },
    performance: {
        hints: "warning",
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "esbuild-loader",
                options: {
                    loader: "jsx",
                    target: "es2016",
                },
            },
            {
                test: /\.(png|jpg|gif|mp4|jpeg)$/,
                type: "asset",
            },
            {
                test: /\.svg/,
                type: "asset",
                generator: {
                    dataUrl: (content) => {
                        content = content.toString();
                        return svgToMiniDataURI(content);
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "esbuild-loader",
                        options: {
                            loader: "css",
                            minify: true,
                        },
                    }
                ],
            },
        ],
    },
    output: { 
        path: path.resolve(__dirname, "build"),
        clean: true,
        publicPath: "/",
        filename: "[name].[chunkhash].js",
        assetModuleFilename: 'images/[hash][ext][query]',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            hash: true,
            favicon: path.resolve(__dirname, "public", "favicon.ico"), 
        }),
 
    ] 
};
