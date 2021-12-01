import { defineConfig } from 'umi'
export default defineConfig({
  define: {
    CurrentEnvironment: 'prd',
  },
  // 清楚日志打印
  extraBabelPlugins: ['transform-remove-console'],
})
