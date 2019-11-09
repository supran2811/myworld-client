module.exports = {
    /// Configure the webpack to run on the files
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader:'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [
                        'react' , 
                        'stage-0',
                        ['env' , {target: { browsers : ['last 2 version'] }}]
                    ]
                }
            }
        ]
    }
}