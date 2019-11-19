module.exports = {
    /// Configure the webpack to run on the files
    mode:'development',
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        '@babel/preset-react', 
                        ['@babel/preset-env'],
                        '@babel/preset-flow'
                    ],
                    plugins:["babel-plugin-styled-components"]
                }
            }
        ]
    }
}