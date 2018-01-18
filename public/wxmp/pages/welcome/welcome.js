//welcome.js  
//获取应用实例  
var app = getApp();
Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        tempFilePaths:null,
        per:''//上传进度
    },
    onLoad: function () {
        console.log('onLoad');
        let _this = this;
        wx.getUserInfo({
            success: res => {
                // 用户授权成功的处理
                // _this.saveUserData(_this, { nickname: res.userInfo.nickName, avatarurl: res.userInfo.avatarUrl, code: app.globalData.code });                
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
                            // that.saveUserData(that,{ nickname: res.userInfo.nickName, avatarurl: res.userInfo.avatarUrl });
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
            // url: 'http://year.com/api/v1/adduser',
            url: app.globalData.baseUrl+'adduser',
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
    chooseimg:function(){
        let _this = this;
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'],
            success: function (res) {
                // console.log(res)
                var tempFilePaths = res.tempFilePaths;
                if (tempFilePaths){
                    _this.setData({
                        tempFilePaths: res.tempFilePaths
                    });
                }else{
                    wx.showToast({
                        title: '没有得到tempFilePaths',
                    })
                }
                
                // wx.getImageInfo({
                //     src: res.tempFilePaths[0],
                //     success: function (res) {
                //         console.log(res)
                //     },
                //     fail:function(e){
                //         console.log(e.errMsg)
                //     }
                // });
                // console.log(_this.data)
            },
            fail:function(e){
                wx.showModal({
                    title: '错误',
                    content: e.errMsg,
                })
            }
        });
    },
    previewImage: function (e) {
        var that = this;
        var dataid = e.currentTarget.dataset.id;
        var imageList = that.data.imageList;
        wx.previewImage({
            current: imageList[dataid],
            urls: this.data.imageList
        });
    },
    userUpload: function(e){
        let _this= this;
        // console.log(e.detail);
        // console.log(this.data);
        // console.log(app.globalData)
        const uploadTask = wx.uploadFile({
            // url: 'http://year.com/api/v1/upload/user', //后台图片上传接口
            url: app.globalData.baseUrl +'/sign', //后台图片上传接口
            filePath: this.data.tempFilePaths[0],
            name: 'image',
            header: {"token":app.globalData.token},
            success: function (res) {
                console.log(res.data)
                // console.log(typeof(res.data))
                // return false;
                var data = JSON.parse(res.data);
                // console.log(data)
                if(data.code==201 && data.msg=='OK'){
                    wx.showToast({
                        title: '签到成功!',
                        duration:2000
                    });
                    _this.setData({
                        tempFilePaths:''
                    })
                }else{
                    wx.showModal({
                        title: '错误',
                        content: JSON.stringify(data),
                    })
                }
            },
            fail: function (e) {
                wx.showModal({
                    title: '错误',
                    content: e.errMsg,
                })
            }
        });
        uploadTask.onProgressUpdate((res) => {
            this.setData({
                per: res.progress
            })
            // console.log('上传进度', res.progress)
            // console.log('已经上传的数据长度', res.totalBytesSent)
            // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
        })
        
    }


    
})  