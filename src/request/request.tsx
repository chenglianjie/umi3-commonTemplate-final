/**
 * 网络请求工具 封装umi-request
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import { extend } from 'umi-request'
import { message } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

// codeMessage仅供参考 具体根据和后端协商,在详细定义.
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  500: '服务器发生错误，请检查服务器。',
}
type mapCode = 200 | 400 | 500

/**
 * 错误异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error
  try {
    if (response && response.status) {
      let errorText = codeMessage[response.status as mapCode] || response.statusText
      const { status } = response
      response
        ?.clone()
        ?.json()
        ?.then((res) => {
          // 后端返回错误信息,就用后端传回的
          errorText = res.msg ? res.msg : errorText
          message.error({
            content: `请求错误 ${status}: ${errorText}`,
            style: { margin: '80vh auto' },
            // 失败提示
            icon: <CloseCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
            // 成功
            // icon: <CheckCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
          })
        })
    } else if (!response) {
      message.error({
        content: '您的网络发生异常或服务器异常',
        style: { margin: '80vh auto' },
        // 失败提示
        icon: <CloseCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
      })
    }
  } catch (err) {
    console.error('统一错误异常处理程序错误', err)
  }
  return response
}

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
})

/**
 * @url 请求的url
 * @parameter 上传的参数
 */

// 每个接口都会带的参数

/**
 * @timestamp 当前时间戳
 * @shop      店铺的域名
 * @hmac      后端需要的参数
 */
interface CommonParameter {
  timestamp: number | string | null
  shop: string | null
  hmac: string | null
}
// 本地开发环境,用写死的参数,线上获取参数
const params = new URLSearchParams(window.location.search)
const shop = process.env.NODE_ENV !== 'development' ? params.get('shop') : 'powder70.hotishop.com'
const timestamp = process.env.NODE_ENV !== 'development' ? params.get('timestamp') : 1635932283
const hmac =
  process.env.NODE_ENV !== 'development'
    ? params.get('hmac')
    : 'cf546104b2b5f65262767e1cd36ee70588b19a3a4a0c072d8046cc3fd38b2fc7'
let obj: CommonParameter = {
  timestamp,
  shop,
  hmac,
}
// 封装的get,post.put,delete请求
const get = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'get', params: { ...obj, ...parameter } })
    const { code = '', msg = '' } = res
    if (code !== 200 && msg) {
      message.error({
        content: msg || '',
        style: { margin: '80vh auto' },
        // 失败提示
        icon: <CloseCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
      })
    }
    return res
  } catch (error) {
    console.error('get请求方式报错', error)
  }
}
const deletes = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'delete', data: { ...obj, ...parameter } })
    const { code, msg = '' } = res
    if (code !== 200 && msg) {
      if (code !== 200) {
        message.error({
          content: msg,
          style: { margin: '80vh auto' },
          // 失败提示
          icon: <CloseCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
        })
      }
    }
    return res
  } catch (error) {
    console.error('deletes请求方式报错', error)
  }
}
const post = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'post', data: { ...obj, ...parameter } })
    const { code, msg = '' } = res
    if (code !== 200 && msg) {
      message.error({
        content: msg,
        // 失败提示
        style: { margin: '80vh auto' },
        icon: <CloseCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
      })
    }
    return res
  } catch (error) {
    console.error('post请求方式报错', error)
  }
}
const put = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
  try {
    const res = await request(url, { method: 'put', params: { ...obj, ...parameter } })
    const { code, msg = '' } = res
    if (code !== 200 && msg) {
      message.error({
        content: msg,
        style: { margin: '80vh auto' },
        // 失败提示
        icon: <CloseCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
      })
    }
    return res
  } catch (error) {
    console.error('put请求方式报错', error)
  }
}

export default {
  get,
  post,
  put,
  deletes,
}
