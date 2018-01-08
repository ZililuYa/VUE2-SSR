const isProd = process.env.NODE_ENV === 'production'

const proUrl = 'http://testmcpapi.aldbim.com' // 生产环境api地址
const devUrl = 'http://testmcpapi.aldbim.com' // 开发api地址
// const devUrl = 'http://192.168.31.225:8080' // 明添
// const devUrl = 'http://192.168.31.232:8085' // 柴伟

const FaceUrl = isProd ? proUrl : devUrl

module.exports = {
  baseUrl: FaceUrl,
  client: {
    baseurl: '/api/v1',
    timeout: 10000
  },
  server: {
    baseurl: FaceUrl + '/api/v1',
    timeout: 10000
  }
}
