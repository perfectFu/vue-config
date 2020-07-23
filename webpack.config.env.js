const devConfig = require('./webpack.config.dev')
const prodConfig = require('./webpack.config.prod')

let config = ''
const env = process.env.NODE_ENV
console.log('1111111111111111', env)
if(env === 'development') {
    config = devConfig
} else if(env === 'production') {
    config = prodConfig
}

module.exports = config