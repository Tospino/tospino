'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  SHOP_API:'"http://47.115.5.76:8082"',   //ERP api
  // SHOP_API:'"http://serviceapp.tospino.com"',   //ERP api
  // SHOP_API:'"http://192.168.3.8:83"',   //ERP api
})
