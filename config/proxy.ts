/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 */

export default {
  dev: {
    '/api/': {
      target: 'https://pinterest-feed.test/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
      secure: false, //  不进行证书验证 后端如果开了 不加false代理会出错
    },
  },
  test: {
    '/api/': {
      target: 'https://develop-pinterest-feed-lf.sz1.codefriend.top/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
      secure: false, //  不进行证书验证 后端如果开了 不加false代理会出错
    },
  },
  prd: {
    '/api/': {
      target: 'http://120.55.193.14:3030/',
      changeOrigin: true,
      // pathRewrite: { '^/api': '' },
    },
  },
}
