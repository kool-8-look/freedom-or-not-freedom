export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16,  // 根字体大小，1rem = 16px
      propList: ['*'],  // 转换所有属性的 px
      selectorBlackList: [],  // 不转换的选择器
      replace: true,  // 替换而不是添加 fallback
      mediaQuery: false,  // 不转换媒体查询中的 px
      minPixelValue: 2,  // 小于 2px 的不转换
      exclude: /node_modules/i  // 排除 node_modules
    }
  }
}
