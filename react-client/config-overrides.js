// 此文件是运行在nodejs中，所以用commonjs规范来写
// 此文件的修改一定要重启项目
// 此文件的作用，就是对于当前项目的增量配置，类似于vue中的vue.config.js文件作用
const {
  // 如果原项目中有此配置，则覆盖，如果没有则新增
  override,
  // 让项目支持装饰器
  addDecoratorsLegacy,
  // 设置引用的路径别名，让它像使用vue中的@一样的去使用
  addWebpackAlias
} = require('customize-cra')
const path = require('path')

module.exports = override(
  // 支持装饰器
  addDecoratorsLegacy(),
  // 添加webpack别名
  addWebpackAlias({
    ['@']: path.resolve('./src')
  })
)
