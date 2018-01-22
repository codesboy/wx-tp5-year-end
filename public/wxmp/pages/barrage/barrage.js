// pages/barrage/barrage.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form_info:'',
        btnDisable: true,//submit按钮的禁用状态
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
        wx.connectSocket({
            url: 'wss://me.rehack.cn'
        });
        wx.onSocketOpen(function (res) {
            console.log("连接成功");

        });


        // wx.connectSocket({
        //     url: 'wss://me.rehack.cn'
        // });
        // wx.onSocketOpen(function (res) {
        //     console.log("连接成功");
            
        // });
        // // 如果断开重新连接
        // wx.onSocketClose(function (res) {
        //     console.log('WebSocket 已关闭！');
        //     wx.connectSocket({
        //         url: 'wss://me.rehack.cn'
        //     });
        //     wx.onSocketOpen(function (res) {
        //         console.log("重新连接成功");

        //     });
        // });
        // wx.onSocketMessage(function (res) {
        //     console.log("收到服务端的消息：" + res.data);
        // }); 

    },
    onShow:function(){
        var _this = this;
        // var token = app.globalData.token;
        // console.log(token)
        // 从本地缓存读取用户头像图片名
        var avatarurl = wx.getStorageSync('avatarurl');
        if (!avatarurl) {
            wx.showModal({
                title: '错误',
                content: '您还没有上传照片签到哦~',
                showCancel: false
            });

        } else {
            this.setData({
                btnDisable: false
            });
            
        };
        // 如果断开重新连接
        wx.onSocketClose(function (res) {
            console.log('WebSocket 已关闭！');
            wx.connectSocket({
                url: 'wss://me.rehack.cn'
            });
            wx.onSocketOpen(function (res) {
                console.log("重新连接成功");

            });
        });
        // wx.onSocketMessage(function (res) {
        //     console.log("收到服务端的消息：" + res.data);
        // }); 
    },
    // 发送弹幕
    sendBarrage: function (e) {
        var _this = this;
        var locavatarurl = wx.getStorageSync('avatarurl');
        console.log(typeof(locavatarurl))
        var sendMsg = {
            msg: e.detail.value.msg,
            avatarurl: locavatarurl
        };

        
        if (!sendMsg.msg){
            wx.showToast({
                title: '不能发空的内容哦~',
                duration:2000,
                icon: 'none'
            });
            return false;
       }
        wx.sendSocketMessage({
            data:JSON.stringify(sendMsg)
            // data: sendMsg
        });
        console.log("给服务端发送一个消息：" + JSON.stringify(sendMsg));
        

        wx.onSocketMessage(function (res) {
            _this.setData({
                form_info:''
            })
            // console.log("收到服务端的消息：" + res.data);
            console.log(res.data);
        }); 

        
        // wx.request({
        //     url: app.globalData.baseUrl + '/sendbarrage', //发送弹幕存数据库接口
        //     method:'POST',
        //     header: {
        //         'content-type': 'application/json', // 默认值
        //         "token": app.globalData.token
        //     },
        //     data: {
        //         msg: e.detail.value.msg
        //     },
        //     success: function (res) {
        //         console.log(res.data);
        //         var data= res.data;
        //         if (data.code == 201 && data.msg == 'OK') {
        //             wx.showToast({
        //                 title: '弹幕发送成功!',
        //                 duration: 2000
        //             });
        //             _this.setData({
        //                 form_info:''
        //             })
        //         } else {
        //             wx.showModal({
        //                 title: '错误',
        //                 content: JSON.stringify(data),
        //             })
        //         }
        //     },
        //     fail:function(e){
        //         wx.showModal({
        //             title: '错误',
        //             content: e.errMsg,
        //         })
        //     }
        // })
    }
})