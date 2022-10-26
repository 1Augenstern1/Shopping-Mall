const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/Shopping-Mall/',
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave:false,
  devServer: {
    proxy: {
         '/api': {
              target: 'http://gmall-h5-api.atguigu.cn',
         },
    },
},
})
