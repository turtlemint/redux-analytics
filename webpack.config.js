const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './demo/app.js',
    output: {
        filename: './bundle.js',
        path: __dirname + '/build'
    },
    watch: true,
    mode: 'none',
    module: {    
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
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
            template: "./demo/index.html",
            filename: "./index.html"
        })
    ]
}