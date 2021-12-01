import { message } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'
export default function IndexPage() {
  return (
    <div>
      <h1
        onClick={() => {
          message.error({
            content: '您的网络发生异常或服务器异常',
            style: { margin: '80vh auto' },
            // 失败提示
            icon: <CloseCircleOutlined style={{ fontSize: 22, color: 'white' }} />,
          })
        }}
      >
        hello umi
      </h1>
    </div>
  )
}
