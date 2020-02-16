let path = require('path')
module.exports = {
  'process.env.BASE_API': '"http://192.168.0.14"',
  'process.env.WS_DOMAIN': '"ws://192.168.0.14"',
  // 'process.env.BASE_API': '"http://192.168.0.190"',
  // 'process.env.BASE_API': '"http://183.6.50.70:10085"',
  'process.env.BASE_API_LOCAL': '"http://127.0.0.1"',
  'process.env.LOG_HOST': '"http://192.168.0.12"',
  'process.env.USB_PORT': '"20010"',
  'process.env.LOCAL_SERVER_PORT': 5000,
  'process.env.LOCAL_SOCKET_PORT': 5001,
  'process.env.GUEST_FILE_PATH': `"${path.join(__dirname, '../static').replace(/\\/g, '\\\\')}"`
}
