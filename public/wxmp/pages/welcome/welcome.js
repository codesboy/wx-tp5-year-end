//welcome.js  
//获取应用实例  
var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {}
    },
    onLoad: function () {
        
        
        console.log('onLoad');

        let _this = this;
        wx.getUserInfo({
            success: res => {
                // 用户授权成功的处理
                _this.saveUserData(_this, { nickname: res.userInfo.nickName, avatarurl: res.userInfo.avatarUrl, code: app.globalData.code });                
            },
            fail: () => {//用户点了拒绝
                wx.showModal({//向用户提示需要权限才能继续
                    title: '警告',
                    content: '若不授权微信登陆,则不能使用本程序!点击授权，则可以重新进行授权；若点击取消，后期还想继续使用本程序，可以删掉本小程序，即可重新授权登陆。',
                    confirmText: '授权',
                    success: res => {
                        if (res.confirm) {
                            // 重新打开授权设置
                            _this.openSet(_this);
                        } else if (res.cancel) {//如果用户点了取消按钮
                            _this.openSet(_this);
                        }
                    }
                });

            }
        })

        
    },

    // 打开权限设置
    openSet:that=>{
        wx.openSetting({
            success: res => {
                if (res.authSetting["scope.userInfo"] == true) {// 如果用户成功打开授权
                    wx.getUserInfo({
                        success: res => {
                            that.saveUserData(that,{ nickname: res.userInfo.nickName, avatarurl: res.userInfo.avatarUrl });
                            // that.setData({
                            //     userInfo: res.userInfo
                            // })
                        }
                    })
                } else {
                    // 如果用户依然拒绝授权
                }
            }
        })
    },

    // 发送用户信息数据到后台接口
    saveUserData:(that,datas)=>{
        wx.request({
            withCredentials: true,
            url: 'http://year.com/api/v1/adduser',
            method: 'post',
            data: datas,
            success: function (res) {
                that.setData({
                    userInfo: datas
                });
                console.log(that)
            }
        })
    },

    // 上传图片
    upload: function () {
        wx.chooseImage({
            success: function (res) {
                var tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    url: 'http://year.com/api/v1/upload', //后台图片上传接口
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                        'user': 'test'
                    },
                    success: function (res) {
                        var data = res.data
                        console.log(data)
                    },
                    fail:function(){
                        console.log('fail')
                    }
                })
            }
        });
    }


    
})  