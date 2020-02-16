const env = require('./dev.env')
const prod = require('./prod.env')

// let webpackEnv

// if (!process.env.NODE_ENV || (process.env.NODE_ENV !== 'production')) {
//   webpackEnv = env
// } else {
//   webpackEnv = prodEnv
// }
module.exports = {
  env: env,
  prod: prod
}
