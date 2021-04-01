module.exports = {
  chainWebpack: config => {
    config.module.rule('vue').use('vue-svg-inline-loader').loader('vue-svg-inline-loader').end();
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: ['quasar']
};
