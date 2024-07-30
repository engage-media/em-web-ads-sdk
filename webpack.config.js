const path = require('path');

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'engage-ads-sdk.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'EngageAdsSDK',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader'
            }
        ]
    }
};
