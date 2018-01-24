var socketOpen = false
var socketMsgQueue = []
wx.connectSocket({
    url: 'wss://me.rehack.cn'
})

wx.onSocketOpen(function (res) {
    socketOpen = true
    for (var i = 0; i < socketMsgQueue.length; i++) {
        sendSocketMessage(socketMsgQueue[i])
    }
    socketMsgQueue = []
})

function sendSocketMessage(msg) {
    if (socketOpen) {
        wx.sendSocketMessage({
            data: msg
        })
    } else {
        socketMsgQueue.push(msg)
    }
}


module.exports.sendSocketMessage = sendSocketMessage
// exports.sayGoodbye = sayGoodbye