// pages/barrage/barrage.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        form_info:''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    // 发送弹幕
    sendBarrage: function (e) {
        var _this = this;
        wx.request({
            url: app.globalData.baseUrl + '/sendbarrage', //发送弹幕接口
            method:'POST',
            header: {
                'content-type': 'application/json', // 默认值
                "token": app.globalData.token
            },
            data: {
                msg: e.detail.value.msg
            },
            success: function (res) {
                console.log(res.data);
                var data= res.data;
                if (data.code == 201 && data.msg == 'OK') {
                    wx.showToast({
                        title: '弹幕发送成功!',
                        duration: 2000
                    });
                    _this.setData({
                        form_info:''
                    })
                } else {
                    wx.showModal({
                        title: '错误',
                        content: JSON.stringify(data),
                    })
                }
            },
            fail:function(e){
                wx.showModal({
                    title: '错误',
                    content: e.errMsg,
                })
            }
        })
    }
})