import { defineConfig } from 'umi'
import proxy from './proxy'
const { resolve } = require('path')
export default defineConfig({
  // 设置 node_modules 目录下依赖文件的编译方式。
  //   子配置项包含：
  // type，类型，可选 all 和 none
  // exclude，忽略的依赖库，包名，暂不支持绝对路径
  // 两种编译模式，

  // 默认是 all，全部编译，然后可以通过 exclude 忽略不需要编译的依赖库；
  // 可切换为 none，默认值编译 es5-imcompatible-versions 里声明的依赖，可通过 exclude 配置添加额外需要编译的；
  // 前者速度较慢，但可规避常见的兼容性等问题，后者反之。
  nodeModulesTransform: {
    type: 'none',
  },
  dva: {
    immer: true,
  },
  // 配置开发服务器 post设置为8888
  devServer: {
    port: 8888,
  },
  // define 用于提供给代码中可用的变量,定义的变量可以全局拿到
  define: {
    CurrentEnvironment: 'test', // 自定义当前的环境变量
    REACT_APP_ENV: process?.env?.REACT_APP_ENV,
  },
  // 路径别名的配置
  alias: {
    '@a': resolve(__dirname, './src/assets'),
    '@r': resolve(__dirname, './src/request'),
    '@u': resolve(__dirname, './src/utils'),
  },
  theme: {
    '@primary-color': '#2C6ECB', // 配置antd的主题色
    '@text-color': '#242D33', // 主文本色
  },
  mfsu: {},
  // 代理
  proxy: proxy[process?.env?.REACT_APP_ENV || 'dev'],
})
