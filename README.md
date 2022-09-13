# vue-clone-messenger

## Project setup
```
npm install
```

### Pusher configuration
```javascript
// go to /src/pusher/index.js
const pusher = new Pusher("APP_KEY", {
  cluster: "APP_CLUSTER"
})
// default channel to send message is 'my-channel'
```

### Run json file with json-server

```
json-server --watch db.json
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Send message
```javascript
// login with 'tuan anh' and 'tuan anh 1'
//Example message
{
  "text": "Example message",
  "timestamp": "10:02 AM",
  "side": "u2",
  "receiver": "u3",
  "message_id": 100
}
```
