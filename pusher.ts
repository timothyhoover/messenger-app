import Pusher from 'pusher'
import ClientPusher from 'pusher-js'

export const serverPusher = new Pusher({
  appId: '1508113',
  key: '51cc9f657c891f89fcd4',
  secret: '1502505879c488271790',
  cluster: 'us3',
  useTLS: true,
})

export const clientPusher = new ClientPusher('51cc9f657c891f89fcd4', {
  cluster: 'us3',
})
