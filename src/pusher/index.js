import Pusher from 'pusher-js'
Pusher.logToConsole = true;
const pusher = new Pusher('fbd674bd9c8bb397cd98', {
  cluster: 'ap1'
})
const channel = pusher.subscribe('my-channel')
export default pusher
export {channel}